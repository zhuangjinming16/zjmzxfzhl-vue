<template>
  <el-rate
    v-model="formData"
    :max="computedConfig.max"
    :disabled="computedConfig.disabled"
    :texts="computedConfig.texts"
    :colors="computedConfig.colors"
    :allow-half="computedConfig.allowHalf"
    :low-threshold="computedConfig.lowThreshold"
    :high-threshold="computedConfig.highThreshold"
    :void-color="computedConfig.voidColor"
    :icon-classes="computedConfig.iconClasses"
    :show-text="computedConfig.showText"
    :show-score="computedConfig.showScore"
    :text-color="computedConfig.textColor"
    :score-template="computedConfig.scoreTemplate"
    :disabled-void-color="computedConfig.disabledVoidColor"
    :void-icon-class="computedConfig.voidIconClass"
    :disabled-void-icon-class="computedConfig.disabledVoidIconClass"
    @change="e => computeFunction(computedConfig.change, e)"
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
      merge(c, this.golbalConfig.rate, this.config)
      return c
    }
  }
}
</script>

