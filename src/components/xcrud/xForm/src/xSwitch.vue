<template>
  <el-switch
    v-model="formData"
    :disabled="computedConfig.disabled"
    :width="computedConfig.width"
    :active-icon-class="computedConfig.activeIconClass"
    :inactive-icon-class="computedConfig.inactiveIconClass"
    :active-text="computedConfig.activeText"
    :inactive-text="computedConfig.inactiveText"
    :active-value="computedConfig.activeValue"
    :inactive-value="computedConfig.inactiveValue"
    :active-color="computedConfig.activeColor"
    :inactive-color="computedConfig.inactiveColor"
    :name="computedConfig.name"
    :validate-event="computedConfig.validateEvent"
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
      merge(c, this.golbalConfig.switch, this.config)
      return c
    }
  }
}
</script>

