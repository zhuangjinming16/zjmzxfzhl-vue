<template>
  <el-table-column
    v-if="computeBoolen(computedConfig.show, true)"
    :type="computedConfig.type"
    :index="computedConfig.index"
    :column-key="computedConfig.columnKey"
    :label="computedConfig.label"
    :prop="computedConfig.name"
    :width="computedConfig.width"
    :min-width="computedConfig.minWidth"
    :fixed="computedConfig.fixed"
    :render-header="computedConfig.renderHeader"
    :sortable="computedConfig.sortable"
    :sort-method="computedConfig.sortMethod"
    :sort-by="computedConfig.sortBy"
    :sort-orders="computedConfig.sortOrders"
    :resizable="computedConfig.resizable"
    :formatter="(row, column, cellValue, index) => computedConfig.formatter ? computedConfig.formatter(row, column, cellValue, index) : filterTableData(row, column, cellValue, index, config)"
    :show-overflow-tooltip="computedConfig.showOverflowTooltip"
    :align="computedConfig.align"
    :header-align="computedConfig.headerAlign"
    :class-name="computedConfig.className"
    :label-class-name="computedConfig.labelClassName"
    :selectable="computedConfig.selectable"
    :reserve-selection="computedConfig.reserveSelection"
    :filters="computedConfig.filters"
    :filter-placement="computedConfig.filterPlacement"
    :filter-multiple="computedConfig.filterMultiple"
    :filter-method="computedConfig.filterMethod"
    :filtered-value="computedConfig.filteredValue"
  >
    <template v-if="computedConfig.children">
      <xColumn v-for="(configItem, configItemIndex) in computedConfig.children" :key="configItemIndex" :config="configItem">
        <!-- slot 传递 -->
        <template v-if="configItem.slot" #[configItem.name]="scope">
          <slot :name="configItem.name" v-bind="scope" />
        </template>
      </xColumn>
    </template>
    <template v-if="computedConfig.slot" v-slot="scope">
      <slot :name="computedConfig.name" v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script>
import mixinComponent from '../../common/xMixin'
import merge from 'lodash.merge'
import { filterDic } from '../../common/filterDic'

export default {
  name: 'XColumn',
  mixins: [mixinComponent()],
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    computedConfig() {
      const c = {}
      merge(c, this.golbalConfig.xtable.column, this.config)
      return c
    }
  },
  methods: {
    // filter表格数据
    filterTableData(row, column, cellValue, index, config) {
      if (!row) return
      if (config.dic) return filterDic(config.dic, cellValue)
      return cellValue
    }
  }
}
</script>

<style>

</style>
