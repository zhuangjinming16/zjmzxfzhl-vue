<template>
  <div>
    <x-form v-if="formConfig" ref="xForm" v-model="formData" :config="formConfig" />
    <slot name="middle" />
    <el-table
      ref="table"
      :data="data"
      :height="computedConfig.height"
      :max-height="computedConfig.maxHeight"
      :stripe="computedConfig.stripe"
      :border="computedConfig.border"
      :size="computedConfig.size"
      :fit="computedConfig.fit"
      :show-header="computedConfig.showHeader"
      :highlight-current-row="computedConfig.highlightCurrentRow"
      :current-row-key="computedConfig.currentRowKey"
      :row-class-name="computedConfig.rowClassName"
      :row-style="computedConfig.rowStyle"
      :cell-class-name="computedConfig.cellClassName"
      :cell-style="computedConfig.cellStyle"
      :header-row-class-name="computedConfig.headerRowClassName"
      :header-row-style="computedConfig.headerRowStyle"
      :header-cell-class-name="computedConfig.headerCellClassName"
      :header-cell-style="computedConfig.headerCellStyle"
      :row-key="computedConfig.rowKey"
      :empty-text="computedConfig.emptyText"
      :default-expand-all="computedConfig.defaultExpandAll"
      :expand-row-keys="computedConfig.expandRowKeys"
      :default-sort="computedConfig.defaultSort"
      :tooltip-effect="computedConfig.tooltipEffect"
      :show-summary="computedConfig.showSummary"
      :sum-text="computedConfig.sumText"
      :summary-method="computedConfig.summaryMethod"
      :span-method="computedConfig.spanMethod"
      :select-on-indeterminate="computedConfig.selectOnIndeterminate"
      :indent="computedConfig.indent"
      :lazy="computedConfig.lazy"
      :load="computedConfig.load"
      :tree-props="computedConfig.treeProps"

      @select="(a, b) => computeFunction(computedConfig.select, a, b) "
      @select-all="(a) => computeFunction(computedConfig.selectAll, a) "
      @selection-change="(a) => computeFunction(computedConfig.selectionChange, a)"
      @cell-mouse-enter="(a, b, c, d) => computeFunction(computedConfig.cellMouseEnter, a, b, c, d) "
      @cell-mouse-leave="(a, b, c, d) => computeFunction(computedConfig.cellMouseLeave, a, b, c, d) "
      @cell-click="(a, b, c, d) => computeFunction(computedConfig.cellClick, a, b, c, d) "
      @cell-dblclick="(a, b, c, d) => computeFunction(computedConfig.cellDblclick, a, b, c, d) "
      @row-click="(a, b, c) => computeFunction(computedConfig.rowClick, a, b, c) "
      @row-contextmenu="(a, b, c) => computeFunction(computedConfig.rowContextmenu, a, b, c) "
      @row-dblclick="(a, b, c) => computeFunction(computedConfig.rowDblclick, a, b, c) "
      @header-click="(a, b) => computeFunction(computedConfig.headerClick, a, b) "
      @header-contextmenu="(a, b) => computeFunction(computedConfig.headerContextmenu, a, b) "
      @sort-change="(a) => computeFunction(computedConfig.sortChange, a) "
      @filter-change="(a) => computeFunction(computedConfig.filterChange, a) "
      @current-change="(a, b) => computeFunction(computedConfig.currentChange, a, b) "
      @header-dragend="(a, b, c, d) => computeFunction(computedConfig.headerDragend, a, b, c, d) "
      @expand-change="(a, b) => computeFunction(computedConfig.expandChange, a, b) "
    >
      <!-- 生成动态列 -->
      <template v-for="(configItem, configIndex) in computedConfig.column">
        <xColumn :key="configIndex" :config="configItem">
          <!-- slot 传递 -->
          <template v-if="configItem.slot" #[configItem.name]="scope">
            <slot :name="configItem.name" v-bind="scope" />
          </template>
        </xColumn>
      </template>

      <!-- 表格的操作按钮 -->
      <el-table-column
        v-if="operateConfig"
        :label="operateConfig.label"
        :width="operateConfig.width"
        :min-width="operateConfig.minWidth"
        :fixed="operateConfig.fixed"
        :render-header="operateConfig.renderHeader"
        :resizable="operateConfig.resizable"
        :align="operateConfig.align"
        :header-align="operateConfig.headerAlign"
        :class-name="operateConfig.className"
        :label-class-name="operateConfig.labelClassName"
      >
        <template slot-scope="scope">
          <template v-for="(operateItem, operateIndex) in operateConfig.btn">
            <el-button
              v-if="operateShow(operateItem, scope.row)"
              :key="operateIndex"
              :size="operateItem.size"
              :type="operateItem.type"
              :plain="operateItem.plain"
              :round="operateItem.round"
              :circle="operateItem.circle"
              :loading="operateItem.loading"
              :disabled="operateItem.disabled"
              :icon="operateItem.icon"
              :autofocus="operateItem.autofocus"
              :native-type="operateItem.nativeType"
              @click="operateItem.click(scope.row)"
            >

              {{ operateItem.text }}

            </el-button>
          </template>
          <template v-if="operateConfig.dropdown.btn.length">
            <el-dropdown
              :class="operateConfig.dropdown.config.className"
              :placement="operateConfig.dropdown.config.placement"
              :trigger="operateConfig.dropdown.config.trigger"
              :hide-on-click="operateConfig.dropdown.config.hideOnClick"
              :show-timeout="operateConfig.dropdown.config.showTimeout"
              :hide-timeout="operateConfig.dropdown.config.hideTimeout"
              :tabindex="operateConfig.dropdown.config.tabindex"
              @command="index => handleDropdownCommand(index, scope.row)"
            >
              <span class="el-dropdown-link">
                {{ operateConfig.dropdown.config.text }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(dropdownBtnItem, dropdownBtnItemIndex) in operateConfig.dropdown.btn">
                  <el-dropdown-item
                    v-if="operateShow(dropdownBtnItem, scope.row)"
                    :key="dropdownBtnItemIndex"
                    :divided="operateConfig.dropdown.config.divided"
                    :disabled="dropdownBtnItem.disabled"
                    :icon="dropdownBtnItem.icon"
                    :command="dropdownBtnItemIndex"
                  >

                    {{ dropdownBtnItem.text }}

                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="page && page.total" class="block foot">
      <el-pagination
        :current-page="page.pageNum"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        style="margin-top: 8px;"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import xForm from '../../xForm/src/xForm.vue'
import xColumn from './xColumn'
import merge from 'lodash.merge'
import cloneDeep from 'lodash.clonedeep'
import mixinComponent from '../../common/xMixin'
export default {
  name: 'XTable',
  components: { xForm, xColumn },
  mixins: [mixinComponent()],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: null
    },
    load: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // 根据表格配置中 search 为true的字段生成搜索框的配置
    formConfig() {
      const _this = this
      const formConfigTemp = {
        item: [],
        operate: []
      }
      const searchConfig = merge({}, this.golbalConfig.xtable.search, this.config.search)
      merge(formConfigTemp, searchConfig.form)
      if (this.config.searchBtn !== false) {
        const searchBtn = merge({}, searchConfig.btn, searchConfig.btn.searchBtn, { click: _this.search })
        formConfigTemp.operate.push(searchBtn)
      }
      if (this.config.resetBtn !== false) {
        const resetBtn = merge({}, searchConfig.btn, searchConfig.btn.resetBtn, { click: _this.reset })
        formConfigTemp.operate.push(resetBtn)
      }
      if (this.config.btn) {
        this.config.btn.forEach(btn => {
          const customBtn = merge({}, searchConfig.btn, btn)
          formConfigTemp.operate.push(customBtn)
        })
      }
      this.config.column.forEach(item => {
        if (item.search) {
          const tmp = cloneDeep(item)
          delete tmp.show
          formConfigTemp.item.push(tmp)
        }
      })
      return formConfigTemp.item.length ? formConfigTemp : false
    },
    computedConfig() {
      const c = {}
      merge(c, this.golbalConfig.xtable.table, this.config)
      return c
    },
    operateConfig() {
      if (!this.config.operate || !this.config.operate.length) return null
      const c = {}
      merge(c, this.golbalConfig.xtable.column, this.golbalConfig.xtable.operate.column)
      c.btn = []
      c.dropdown = {
        config: this.golbalConfig.xtable.operate.dropdown,
        btn: []
      }
      if (this.config.operate) {
        for (let i = 0; i < this.config.operate.length; i++) {
          const b = merge({}, this.golbalConfig.xtable.operate.btn, this.config.operate[i])
          if (b.dropdown === true) {
            c.dropdown.btn.push(b)
          } else {
            c.btn.push(b)
          }
        }
      }
      return c
    }
  },
  methods: {
    // 重置
    reset() {
      if (this.page) {
        this.page.pageNum = 1
      }
      this.$refs['xForm'].resetFields()
      this.getList()
    },
    // 表格的操作按钮显隐
    operateShow(operateItem, row) {
      if (typeof operateItem.show === 'boolean') {
        return operateItem.show
      } else if (typeof operateItem.show === 'function') {
        return operateItem.show(row)
      } else {
        return this.golbalConfig.xtable.table.operate.btn.show
      }
    },
    // 下拉菜单的点击事件
    handleDropdownCommand(index, row) {
      this.operateConfig.dropdown.btn[index].click(row)
    },
    // 点击搜索
    search() {
      if (this.page) {
        this.page.pageNum = 1
      }
      this.getList()
    },
    // 发送绑定的api
    getList() {
      this.load()
    },
    handleSizeChange(val) { // 每页显示几条
      this.page.pageSize = val
      this.$emit('update:page', this.page)
      this.getList()
    },
    handleCurrentChange(val) { // 当前页显示几条
      this.page.pageNum = val
      this.$emit('update:page', this.page)
      this.getList()
    },
    // 重写 table methods
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row)
    },
    clearSort() {
      this.$refs.table.clearSort()
    },
    clearFilter(columnKey) {
      this.$refs.table.clearFilter(columnKey)
    },
    doLayout() {
      this.$refs.table.doLayout()
    },
    sort(prop, order) {
      this.$refs.table.sort(prop, order)
    }
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    margin-left: 6px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
