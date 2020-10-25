<template>
  <el-transfer
    v-model="formData"
    :data="computedConfig.data"
    :filterable="computedConfig.filterable"
    :titles="computedConfig.titles"
    :format="computedConfig.format"
    :props="computedConfig.props"
    :filter-placeholder="computedConfig.filterPlaceholder"
    :filter-method="computedConfig.filterMethod"
    :target-order="computedConfig.targetOrder"
    :button-texts="computedConfig.buttonTexts"
    :render-content="computedConfig.renderContent"
    :left-default-checked="computedConfig.leftDefaultChecked"
    :right-default-checked="computedConfig.rightDefaultChecked"

    @change="(a,b,c) => computeFunction(computedConfig.change, a, b, c)"
    @left-check-change="(a, b) => computeFunction(computedConfig.blur, a, b)"
    @right-check-change="(a, b) => computeFunction(computedConfig.blur, a, b)"
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
      merge(c, this.golbalConfig.transfer, this.config)
      return c
    }
  }
}
</script>

