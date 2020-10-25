<template>
  <el-cascader
    v-model="formData"
    :options="computedConfig.options"
    :props="computedConfig.props"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :disabled="computedConfig.disabled"
    :clearable="computedConfig.clearable"
    :show-all-levels="computedConfig.showAllLevels"
    :collapse-tags="computedConfig.collapseTags"
    :separator="computedConfig.separator"
    :filterable="computedConfig.filterable"
    :filter-method="computedConfig.filterMethod"
    :debounce="computedConfig.debounce"
    :before-filter="computedConfig.beforeFilter"
    :popper-class="computedConfig.popperClass"
    @change="e => computeFunction(computedConfig.change, e)"
    @expand-change="e => computeFunction(computedConfig.expandChange, e)"
    @blur="e => computeFunction(computedConfig.blur, e)"
    @focus="e => computeFunction(computedConfig.focus, e)"
    @visible-change="e => computeFunction(computedConfig.visibleChange, e)"
    @remove-tag="e => computeFunction(computedConfig.removeTag, e)"
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
      merge(c, this.golbalConfig.cascader, this.config)
      return c
    }
  }
}
</script>

