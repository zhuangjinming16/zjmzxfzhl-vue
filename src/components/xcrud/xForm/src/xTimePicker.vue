<template>
  <el-time-picker
    v-model="formData"
    :readonly="computedConfig.readonly"
    :disabled="computedConfig.disabled"
    :editable="computedConfig.editable"
    :clearable="computedConfig.clearable"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :align="computedConfig.align"
    :name="computedConfig.name"
    :start-placeholder="computedConfig.startPlaceholder"
    :end-placeholder="computedConfig.endPlaceholder"
    :is-range="computedConfig.isRange"
    :arrow-control="computedConfig.arrowControl"
    :popper-class="computedConfig.popperClass"
    :picker-options="computedConfig.pickerOptions"
    :range-separator="computedConfig.rangeSeparator"
    :value-format="computedConfig.valueFormat"
    :default-value="computedConfig.defaultValue"
    :prefix-icon="computedConfig.prefixIcon"
    :clear-icon="computedConfig.clearIcon"

    :selectable-range="computedConfig.selectableRange"
    :format="computedConfig.format"
    @change="e => computeFunction(computedConfig.change, e)"
    @blur="e => computeFunction(computedConfig.blur, e)"
    @focus="e => computeFunction(computedConfig.focus, e)"
  />
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
import mixinComponent from '../../common/xMixin'
import merge from 'lodash.merge'
export default {
  mixins: [mixinComponent()],
  data() {
    return {
      // value: this.value
    }
  },
  computed: {
    computedConfig() {
      const c = {}
      merge(c, this.golbalConfig.timePicker, this.config)
      return c
    }
  }
}
</script>

