<template>
  <el-radio-group
    v-model="formData"
    :disabled="computedConfig.disabled"
    :size="computedConfig.size"
    :text-color="computedConfig.textColor"
    :fill="computedConfig.fill"
    @change="data => computeFunction(computedConfig.change, data)"
  >
    <el-radio
      v-for="(item, itemIndex) in config.dic"
      :key="itemIndex"
      :disabled="item.disabled"
      :label="item.value"
      :border="computedConfig.border"
    >{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script>
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
      merge(c, this.golbalConfig.radio, this.config)
      return c
    }
  }
}
</script>

