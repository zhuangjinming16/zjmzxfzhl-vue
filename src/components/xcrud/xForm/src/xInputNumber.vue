<template>
  <el-input-number
    v-model="formData"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :step="computedConfig.step"
    :step-strictly="computedConfig.stepStrictly"

    :precision="computedConfig.precision"
    :size="computedConfig.size"
    :disabled="computedConfig.disabled"
    :controls="computedConfig.controls"
    :controls-position="computedConfig.controlsPosition"
    :name="computedConfig.name"
    :label="computedConfig.label"
    :placeholde="computedConfig.placeholde"
    @change="(currentValue, oldValue) => computeFunction(computedConfig.change, currentValue, oldValue)"
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
      merge(c, this.golbalConfig.inputNumber, this.config)
      return c
    }
  }
}
</script>

