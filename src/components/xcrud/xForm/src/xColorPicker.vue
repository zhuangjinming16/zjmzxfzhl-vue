<template>
  <el-color-picker
    v-model="formData"
    :disabled="computedConfig.disabled"
    :size="computedConfig.size"
    :predefine="computedConfig.predefine"
    :show-alpha="computedConfig.showAlpha"
    :color-format="computedConfig.colorFormat"
    :popper-class="computedConfig.popperClass"
    @change="e => computeFunction(computedConfig.change, e)"
    @active-change="e => computeFunction(computedConfig.activeChange, e)"
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
      merge(c, this.golbalConfig.colorPicker, this.config)
      return c
    }
  }
}
</script>

