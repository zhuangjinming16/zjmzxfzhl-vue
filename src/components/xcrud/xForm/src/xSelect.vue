<template>
  <el-select
    v-model="formData"
    :multiple="computedConfig.multiple"
    :disabled="computedConfig.disabled"
    :value-key="computedConfig.valueKey"
    :size="computedConfig.size"
    :clearable="computedConfig.clearable"
    :collapse-tags="computedConfig.collapseTags"
    :multiple-limit="computedConfig.multipleLimit"
    :name="computedConfig.name"
    :autocomplete="computedConfig.autocomplete"
    :placeholder="computedConfig.placeholder"
    :filterable="computedConfig.filterable"
    :allow-create="computedConfig.allowCreate"
    :filter-method="computedConfig.filterMethod"
    :remote="computedConfig.remote"
    :remote-method="computedConfig.remoteMethod"
    :loading="computedConfig.loading"
    :loading-text="computedConfig.loadingText"
    :no-match-text="computedConfig.noMatchText"
    :no-data-text="computedConfig.noDataText"
    :popper-class="computedConfig.popperClass"
    :reserve-keyword="computedConfig.reserveKeyword"
    :default-first-option="computedConfig.defaultFirstOption"
    :popper-append-to-body="computedConfig.popperAppendToBody"
    :automatic-dropdown="computedConfig.automaticDropdown"
    @change="data => computeFunction(computedConfig.change, data)"
    @visible-change="data => computeFunction(computedConfig.visibleChange, data)"
    @remove-tag="data => computeFunction(computedConfig.removeTag, data)"
    @clear="data => computeFunction(computedConfig.clear, data)"
    @blur="data => computeFunction(computedConfig.blur, data)"
    @focus="data => computeFunction(computedConfig.focus, data)"
  >
    <el-option
      v-for="(item, itemIndex) in getDic"
      :key="itemIndex"
      :disabled="item.disabled"
      :label="item[labelName]"
      :value="item[valueName]"
    />
  </el-select>
</template>

<script>
import mixinComponent from '../../common/xMixin'
import merge from 'lodash.merge'
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
      merge(c, this.golbalConfig.select, this.config)
      return c
    }
  }
}
</script>

