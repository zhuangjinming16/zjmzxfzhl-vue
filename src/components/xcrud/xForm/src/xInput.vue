<template>
  <el-input
    v-model="formData"
    :type="computedConfig.type"
    :value="computedConfig.value"
    :maxlength="computedConfig.maxlength"
    :minlength="computedConfig.minlength"
    :show-word-limit="computedConfig.showWordLimit"
    :placeholder="computedConfig.placeholder"
    :clearable="computedConfig.clearable"
    :show-password="computedConfig.showPassword"
    :disabled="computedConfig.disabled"
    :size="computedConfig.size"
    :prefix-icon="computedConfig.prefixIcon"
    :suffix-icon="computedConfig.suffixIcon"
    :rows="computedConfig.rows"
    :autosize="computedConfig.autosize"
    :autocomplete="computedConfig.autocomplete"
    :auto-complete="computedConfig.autoComplete"
    :name="computedConfig.name"
    :readonly="computedConfig.readonly"
    :max="computedConfig.max"
    :min="computedConfig.min"
    :step="computedConfig.step"
    :resize="computedConfig.resize"
    :autofocus="computedConfig.autofocus"
    :form="computedConfig.form"
    :label="computedConfig.label"
    :tabindex="computedConfig.tabindex"

    @blur="e => computeFunction(computedConfig.blur, e)"
    @focus="e => computeFunction(computedConfig.focus, e)"
    @change="e => computeFunction(computedConfig.change, e)"
    @input="e => computeFunction(computedConfig.input, e)"
    @clear="e => computeFunction(computedConfig.clear, e)"
  />
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
      merge(c, this.golbalConfig.input, this.config)
      return c
    }
  },
  methods: {
    handleChange(value) {

    }
  }
}
</script>

