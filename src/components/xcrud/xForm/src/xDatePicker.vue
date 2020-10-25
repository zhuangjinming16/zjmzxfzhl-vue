<template>
  <el-date-picker
    v-model="formData"
    :readonly="computedConfig.readonly"
    :disabled="computedConfig.disabled"
    :editable="computedConfig.editable"
    :clearable="computedConfig.clearable"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :start-placeholder="computedConfig.startPlaceholder"
    :end-placeholder="computedConfig.endPlaceholder"
    :type="computedConfig.type"
    :format="computedConfig.format"
    :align="computedConfig.align"
    :popper-class="computedConfig.popperClass"
    :picker-options="computedConfig.pickerOptions"
    :range-separator="computedConfig.rangeSeparator"
    :default-value="computedConfig.defaultValue"
    :default-time="computedConfig.defaultTime"
    :value-format="computedConfig.valueFormat"
    :name="computedConfig.name"
    :unlink-panels="computedConfig.unlinkPanels"
    :prefix-icon="computedConfig.prefixIcon"
    :clear-icon="computedConfig.clearIcon"
    :validate-event="computedConfig.validateEvent"
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
      merge(c, this.golbalConfig.datePicker, this.config)
      return c
    }
  }
}
</script>

