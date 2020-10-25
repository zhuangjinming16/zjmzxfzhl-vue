<template>
  <el-checkbox-group
    v-model="formData"
    :size="computedConfig.size"
    :disabled="computedConfig.disabled"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :text-color="computedConfig.textColor"
    :fill="computedConfig.fill"
    @change="data => computeFunction(computedConfig.change, data)"
  >
    <el-checkbox
      v-for="(item, itemIndex) in getDic"
      :key="itemIndex"
      :label="item[valueName]"
      :true-label="item.trueLabel"
      :false-label="item.falseLabel"
      :disabled="item.disabled"
      :border="computedConfig.border"
      :checked="item.checked"
      :indeterminate="item.indeterminate"
    >{{ item[labelName] }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import merge from 'lodash.merge'
import mixinComponent from '../../common/xMixin'
export default {
  mixins: [mixinComponent()],
  data() {
    const _this = this
    return {
      labelName: _this.config.dic.label ? _this.config.dic.label : 'label',
      valueName: _this.config.dic.value ? _this.config.dic.value : 'value'
    }
  },
  computed: {
    getDic() {
      const dic = this.config.dic
      if (dic instanceof Array) {
        return dic
      } else if (dic.data instanceof Array) {
        return dic.data
      }
      return undefined
    },
    computedConfig() {
      const c = {}
      merge(c, this.golbalConfig.checkbox, this.config)
      return c
    }
  }
}
</script>

