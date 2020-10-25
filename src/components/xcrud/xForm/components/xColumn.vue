<template>
  <el-table-column
    v-if="computeBoolen(columnConfig.show, true)"
    :header-align="columnConfig.headerAlign"
    :prop="columnConfig.name"
    :label="columnConfig.label"
    :width="columnConfig.width"
    :min-width="columnConfig.minWidth"
    :show-overflow-tooltip="columnConfig.showOverflowTooltip"
    :align="columnConfig.align"
    :class-name="columnConfig.className"
    :render-header="columnConfig.renderHeader"
  >
    <template v-if="columnConfig.children">
      <xColumn v-for="(configItem, configItemIndex) in columnConfig.children" :key="configItemIndex" :tab-config="tabConfig" :config="configItem">
        <!-- slot 传递 -->
        <template v-if="configItem.slot" #[configItem.name]="scope">
          <slot :name="configItem.name" v-bind="scope" />
        </template>
      </xColumn>
    </template>
    <template v-if="!columnConfig.children" slot="header">
      {{ columnConfig.label }}
      <el-tooltip v-if="columnConfig.tooltip" :effect="tooltipConfig.effect" :placement="tooltipConfig.placement">
        <div slot="content"><span v-html="columnConfig.tooltip" /></div>
        <i :class="tooltipConfig.iconName" :style="tooltipConfig.iconStyle" />
      </el-tooltip>
    </template>
    <template v-if="!columnConfig.children" v-slot="scope">
      <el-form-item
        label-width="0px"
        :rules="columnConfig.rules"
        :prop="tabConfig.name + '.' + scope.$index + '.' + columnConfig.name"
      >
        <slot v-if="columnConfig.slot" :name="columnConfig.name" v-bind="scope" />
        <component
          :is="getComponentType(columnConfig)"
          v-else-if="columnConfig.xType"
          v-model="scope.row[columnConfig.name]"
          :style="columnConfig.style"
          :config="columnConfig"
        />
        <span v-else>{{ filterTableData(scope.row[columnConfig.name]) }}</span>
      </el-form-item>
    </template>
  </el-table-column>
</template>

<script>
import mixinComponent from '../../common/xMixin'
import { getComponentType } from '../../common/util'
import merge from 'lodash.merge'
import { filterDic } from '../../common/filterDic'

import xCascader from '../src/xCascader'
import xCheckbox from '../src/xCheckbox'
import xColorPicker from '../src/xColorPicker'
import xDatePicker from '../src/xDatePicker'
import xInput from '../src/xInput'
import xAutocomplete from '../src/xAutocomplete'
import xInputNumber from '../src/xInputNumber'
import xRadio from '../src/xRadio'
import xRate from '../src/xRate'
import xSelect from '../src/xSelect'
import xSlider from '../src/xSlider'
import xSwitch from '../src/xSwitch'
import xTimePicker from '../src/xTimePicker'
import xTimeSelect from '../src/xTimeSelect'
import xTransfer from '../src/xTransfer'
import xTree from '../src/xTree'

export default {
  name: 'XColumn',
  components: {
    xCascader,
    xCheckbox,
    xColorPicker,
    xDatePicker,
    xInput,
    xAutocomplete,
    xInputNumber,
    xRadio,
    xRate,
    xSelect,
    xSlider,
    xSwitch,
    xTimePicker,
    xTimeSelect,
    xTransfer,
    xTree
  },
  mixins: [mixinComponent()],
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    tabConfig: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    columnConfig() {
      const c = {}
      merge(c, this.golbalConfig.xform.form.tabs.table.column, this.config)
      return c
    },
    tooltipConfig() {
      return this.golbalConfig.xform.form.tooltip
    }
  },
  methods: {
    // filter表格数据
    filterTableData(cellValue) {
      if (this.config.dic) return filterDic(this.config.dic, cellValue)
      return cellValue
    },
    getComponentType: getComponentType
  }
}
</script>

<style>

</style>
