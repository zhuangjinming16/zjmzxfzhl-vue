<template>
  <!-- :rules="rules" -->
  <el-form
    v-if="isInitFormData && computedConfig.item"
    ref="refForm"
    :model="formData"
    :inline="computedConfig.inline"
    :label-position="computedConfig.labelPosition"
    :label-width="computedConfig.labelWidth"
    :label-suffix="computedConfig.labelSuffix"
    :hide-required-asterisk="computedConfig.hideRequiredAsterisk"
    :show-message="computedConfig.showMessage"
    :inline-message="computedConfig.inlineMessage"
    :status-icon="computedConfig.statusIcon"
    :validate-on-rule-change="computedConfig.validateOnRuleChange"
    :size="computedConfig.size"
    :disabled="computedConfig.disabled"

    @validate="(a, b, c) => computeFunction(computedConfig.validate, a, b, c)"
  >

    <!-- 输入项 -->
    <template v-for="(configItem, configItemIndex) in computedConfig.item">
      <slot v-if="typeof configItem.slot === 'string' && computeBoolen(configItem.show, true)" :name="configItem.slot" />
      <!-- tabs表格 -->
      <el-tabs
        v-else-if="configItem.xType === 'tabs'"
        :key="configItemIndex"
        v-model="activeTab"
        class="tab-table"
        :type="computedConfig.tabs.type"
        :closable="computedConfig.tabs.closable"
        :addable="computedConfig.tabs.addable"
        :editable="computedConfig.tabs.editable"
        :tab-position="computedConfig.tabs.tabPosition"
        :stretch="computedConfig.tabs.stretch"
        @tab-click="(a) => computeFunction(computedConfig.tabs.tabClick, a)"
        @tab-remove="(a) => computeFunction(computedConfig.tabs.tabRemove, a)"
        @tab-add="() => computeFunction(computedConfig.tabs.tabAdd)"
        @edit="(a, b) => computeFunction(computedConfig.tabs.edit, a, b)"
      >
        <template v-for="(tabConfig, tabConfigIndex) in configItem.tabs">
          <el-tab-pane
            v-if="computeBoolen(tabConfig.show, true)"
            :key="tabConfigIndex"
            :name="tabConfig.name"
            :disabled="computeBoolen(tabConfig.disabled, false)"
            :closable="computeBoolen(tabConfig.closable, false)"
            :lazy="computeBoolen(tabConfig.lazy, false)"
            :label="tabConfig.label"
          >
            <el-button
              v-if="computeBoolen(tabConfig.addConfig.show, true)"
              :style="tabConfig.addConfig.style"
              :class="tabConfig.addConfig.className"
              :type="tabConfig.addConfig.type"
              :icon="tabConfig.addConfig.icon"
              :size="tabConfig.addConfig.size"
              :plain="computeBoolen(tabConfig.addConfig.plain, false)"
              :round="computeBoolen(tabConfig.addConfig.round, false)"
              :circle="computeBoolen(tabConfig.addConfig.circle, false)"
              @click="tabConfig.addConfig.click(tabConfig.add, formData[tabConfig.name])"
            >
              <span v-if="tabConfig.addConfig.text">{{ tabConfig.addConfig.text }}</span>
            </el-button>
            <el-table
              :data="formData[tabConfig.name]"
              :height="tabConfig.height"
              :max-height="tabConfig.maxHeight"
              :stripe="tabConfig.stripe"
              :border="tabConfig.border"
              :size="tabConfig.size"
              :fit="tabConfig.fit"
              :show-header="tabConfig.showHeader"
              :highlight-current-row="tabConfig.highlightCurrentRow"
              :current-row-key="tabConfig.currentRowKey"
              :row-class-name="tabConfig.rowClassName"
              :row-style="tabConfig.rowStyle"
              :cell-class-name="tabConfig.cellClassName"
              :cell-style="tabConfig.cellStyle"
              :header-row-class-name="tabConfig.headerRowClassName"
              :header-row-style="tabConfig.headerRowStyle"
              :header-cell-class-name="tabConfig.headerCellClassName"
              :header-cell-style="tabConfig.headerCellStyle"
              :row-key="tabConfig.rowKey"
              :empty-text="tabConfig.emptyText"
              :default-expand-all="tabConfig.defaultExpandAll"
              :expand-row-keys="tabConfig.expandRowKeys"
              :default-sort="tabConfig.defaultSort"
              :tooltip-effect="tabConfig.tooltipEffect"
              :show-summary="tabConfig.showSummary"
              :sum-text="tabConfig.sumText"
              :summary-method="tabConfig.summaryMethod"
              :span-method="tabConfig.spanMethod"
              :select-on-indeterminate="tabConfig.selectOnIndeterminate"
              :indent="tabConfig.indent"
              :lazy="tabConfig.lazy"
              :load="tabConfig.load"
              :tree-props="tabConfig.treeProps"

              @select="(a, b) => computeFunction(tabConfig.select, a, b) "
              @select-all="(a) => computeFunction(tabConfig.selectAll, a) "
              @selection-change="(a) => computeFunction(tabConfig.selectionChange, a)"
              @cell-mouse-enter="(a, b, c, d) => computeFunction(tabConfig.cellMouseEnter, a, b, c, d) "
              @cell-mouse-leave="(a, b, c, d) => computeFunction(tabConfig.cellMouseLeave, a, b, c, d) "
              @cell-click="(a, b, c, d) => computeFunction(tabConfig.cellClick, a, b, c, d) "
              @cell-dblclick="(a, b, c, d) => computeFunction(tabConfig.cellDblclick, a, b, c, d) "
              @row-click="(a, b, c) => computeFunction(tabConfig.rowClick, a, b, c) "
              @row-contextmenu="(a, b, c) => computeFunction(tabConfig.rowContextmenu, a, b, c) "
              @row-dblclick="(a, b, c) => computeFunction(tabConfig.rowDblclick, a, b, c) "
              @header-click="(a, b) => computeFunction(tabConfig.headerClick, a, b) "
              @header-contextmenu="(a, b) => computeFunction(tabConfig.headerContextmenu, a, b) "
              @sort-change="(a) => computeFunction(tabConfig.sortChange, a) "
              @filter-change="(a) => computeFunction(tabConfig.filterChange, a) "
              @current-change="(a, b) => computeFunction(tabConfig.currentChange, a, b) "
              @header-dragend="(a, b, c, d) => computeFunction(tabConfig.headerDragend, a, b, c, d) "
              @expand-change="(a, b) => computeFunction(tabConfig.expandChange, a, b) "
            >
              <template v-for="(columnConfig, columnIndex) in tabConfig.column">
                <xColumn :key="columnIndex" :config="columnConfig" :tab-config="tabConfig">
                  <!-- slot 传递 -->
                  <template v-if="columnConfig.slot" #[columnConfig.name]="scope">
                    <slot :name="columnConfig.name" v-bind="scope" />
                  </template>
                </xColumn>
              </template>
              <el-table-column
                v-if="tabConfig.operate.show"
                :label="tabConfig.operate.label"
                :width="tabConfig.operate.width"
                :header-align="tabConfig.operate.headerAlign"
                :align="tabConfig.operate.align"
              >
                <template v-slot="scope">
                  <el-form-item label-width="0px">
                    <el-button
                      v-for="(btn, btnIndex) in tabConfig.operate.btn"
                      :key="btnIndex"
                      :style="btn.style"
                      :class="btn.className"
                      :type="btn.type"
                      :icon="btn.icon"
                      :size="btn.size"
                      :plain="computeBoolen(btn.plain, false)"
                      :round="computeBoolen(btn.round, false)"
                      :circle="computeBoolen(btn.circle, false)"
                      @click="btn.click(formData[tabConfig.name], scope.$index, tabConfig.remove)"
                    >
                      <span v-if="btn.text">{{ btn.text }}</span>
                    </el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
      <!-- 动态加载组件 -->
      <el-form-item
        v-else-if="computeBoolen(configItem.show, true)"
        :key="configItemIndex"
        :prop="configItem.name"
        :label="configItem.label + '：'"
        :rules="configItem.rules"
      >
        <span slot="label">
          {{ configItem.label }}
          <el-tooltip v-if="configItem.tooltip" :effect="computedConfig.tooltip.effect" :placement="computedConfig.tooltip.placement">
            <div slot="content"><span v-html="configItem.tooltip" /></div>
            <i :class="computedConfig.tooltip.iconName" :style="computedConfig.tooltip.iconStyle" />
          </el-tooltip>
          ：
        </span>
        <slot v-if="getComponentType(configItem) === 'slot'" :name="configItem.name" />
        <component
          :is="getComponentType(configItem)"
          v-else
          v-model="formData[configItem.name]"
          :style="configItem.style ? configItem.style : computedConfig.itemStyle"
          :config="configItem"
        />
      </el-form-item>
    </template>

    <!-- 按钮 -->
    <el-form-item v-if="computedConfig.operate">
      <template v-for="(operateItem, operateItemIndex) in computedConfig.operate">
        <el-button
          v-if="computeBoolen(operateItem.show, true)"
          :key="operateItemIndex"
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

          @click="operateItem.click()"
        >
          {{ operateItem.text }}
        </el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import mixinComponent from '../../common/xMixin'
import { getComponentType } from '../../common/util'
import merge from 'lodash.merge'

import xCascader from './xCascader'
import xCheckbox from './xCheckbox'
import xColorPicker from './xColorPicker'
import xDatePicker from './xDatePicker'
import xInput from './xInput'
import xAutocomplete from './xAutocomplete'
import xInputNumber from './xInputNumber'
import xRadio from './xRadio'
import xRate from './xRate'
import xSelect from './xSelect'
import xSlider from './xSlider'
import xSwitch from './xSwitch'
import xTimePicker from './xTimePicker'
import xTimeSelect from './xTimeSelect'
import xTransfer from './xTransfer'
import xTree from './xTree'
import xColumn from '../components/xColumn'

export default {
  name: 'XForm',
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
    xTree,
    xColumn
  },
  mixins: [mixinComponent()],
  data() {
    return {
      rules: {},
      isInitFormData: false,
      activeTab: ''
    }
  },
  computed: {
    computedConfig() {
      const c = {}
      merge(c, this.golbalConfig.xform.form, this.config)
      for (let i = 0; i < this.config.item.length; i++) {
        const item = this.config.item[i]
        c.item[i] = merge({}, this.golbalConfig[item.xType], item)
        if (item.xType === 'tabs') {
          c.item[i].tabs.forEach((tab, tableIndex) => {
            const table = {}
            merge(table, this.golbalConfig.xform.form.tabs.table, tab)
            this.$set(c.item[i].tabs, tableIndex, table)
          })
        }
      }
      if (this.config.operate) {
        for (let i = 0; i < this.config.operate.length; i++) {
          const operate = this.config.operate[i]
          c.operate[i] = merge({}, this.golbalConfig.xform.operate.btn, operate)
        }
      }
      return c
    }
  },
  created() {
    this.initFormData()
    this.isInitFormData = true
  },
  methods: {
    // 初始化表单数据
    initFormData() {
      const xTypeArr = ['checkbox']
      const typeArr = ['datetimerange', 'daterange', 'monthrange']
      this.config.item.forEach(item => {
        if (item.multiple || xTypeArr.includes(item.xType) || typeArr.includes(item.type)) {
          if (!this.formData[item.name]) {
            this.formData[item.name] = []
          }
        } else if (item.xType === 'tabs') {
          item.tabs.forEach((tab, tabIndex) => {
            if (tabIndex === 0) this.activeTab = tab.name
            if (!this.formData[tab.name]) {
              this.formData[tab.name] = []
            }
          })
        }
      })
      this.formData = JSON.parse(JSON.stringify(this.formData))
    },
    // 获取动态组件类型
    getComponentType: getComponentType,
    // 重置表单
    resetFields() {
      this.$refs['refForm'].resetFields()
    },
    // 清除校验
    clearValidate() {
      this.$refs['refForm'].clearValidate()
    },
    // 校验
    validate(fun) {
      const validPromise = new Promise((resolve, reject) => {
        this.$refs['refForm'].validate((valid, obj) => {
          if (valid) {
            resolve()
          } else {
            for (const key in obj) {
              if (/\.\d\./.test(key)) {
                this.activeTab = key.split('.')[0]
              }
            }
            reject()
          }
          if (fun) {
            fun(valid, obj)
          }
        })
      })
      if (fun === undefined) {
        return validPromise
      }
    },
    // 动态 table 表单
    addDynamic(fun, arr) {
      if (fun) {
        fun(arr)
        return
      }
      arr.splice(arr.length, 0, {})
    }
  }
}
</script>

<style lang="scss">
.tab-table .el-form-item {
  margin-bottom: 16px;
}
.tab-table tbody td {
  padding-bottom: 0px;
}
.tab-table {
  margin-bottom: 22px;
}
</style>
