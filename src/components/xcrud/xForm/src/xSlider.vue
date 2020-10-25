<template>
  <el-slider
    v-model="formData"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :disabled="computedConfig.disabled"
    :step="computedConfig.step"
    :range="computedConfig.range"
    :vertical="computedConfig.vertical"
    :height="computedConfig.height"
    :label="computedConfig.label"
    :debounce="computedConfig.debounce"
    :marks="computedConfig.marks"
    :tooltip-class="computedConfig.tooltipClass"
    :show-input="computedConfig.showInput"
    :show-input-controls="computedConfig.showInputControls"
    :input-size="computedConfig.inputSize"
    :show-stops="computedConfig.showStops"
    :show-tooltip="computedConfig.showTooltip"
    :format-tooltip="computedConfig.formatTooltip"
    @change="e => computeFunction(computedConfig.change, e)"
    @input="e => computeFunction(computedConfig.input, e)"
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
      merge(c, this.golbalConfig.slider, this.config)
      return c
    }
  }
}
</script>

