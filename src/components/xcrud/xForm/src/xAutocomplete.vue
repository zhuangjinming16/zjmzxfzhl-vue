<template>
  <el-autocomplete
    v-model="formData"
    :placeholder="computedConfig.placeholder"
    :disabled="computedConfig.disabled"
    :value-key="computedConfig.valueKey"
    :value="computedConfig.value"
    :debounce="computedConfig.debounce"
    :placement="computedConfig.placement"
    :fetch-suggestions="computedConfig.fetchSuggestions"
    :popper-class="computedConfig.popperClass"
    :trigger-on-focus="computedConfig.triggerOnFocus"
    :name="computedConfig.name"
    :select-when-unmatched="computedConfig.selectWhenUnmatched"
    :label="computedConfig.label"
    :prefix-icon="computedConfig.prefixIcon"
    :suffix-icon="computedConfig.suffixIcon"
    :hide-loading="computedConfig.hideLoading"
    :popper-append-to-body="computedConfig.popperAppendToBody"
    :highlight-first-item="computedConfig.highlightFirstItem"

    :maxlength="computedConfig.maxlength"
    :minlength="computedConfig.minlength"
    :show-word-limit="computedConfig.showWordLimit"
    :clearable="computedConfig.clearable"
    :show-password="computedConfig.showPassword"
    :size="computedConfig.size"
    :rows="computedConfig.rows"
    :autosize="computedConfig.autosize"
    :autocomplete="computedConfig.autocomplete"
    :auto-complete="computedConfig.autoComplete"
    :readonly="computedConfig.readonly"
    :max="computedConfig.max"
    :min="computedConfig.min"
    :step="computedConfig.step"
    :resize="computedConfig.resize"
    :autofocus="computedConfig.autofocus"
    :form="computedConfig.form"
    :tabindex="computedConfig.tabindex"

    @blur="e => computeFunction(computedConfig.blur, e)"
    @focus="e => computeFunction(computedConfig.focus, e)"
    @change="e => computeFunction(computedConfig.change, e)"
    @input="e => computeFunction(computedConfig.input, e)"
    @clear="e => computeFunction(computedConfig.clear, e)"
    @select="e => computeFunction(computedConfig.select, e)"
  />
</template>

<script>
import merge from 'lodash.merge'
import mixinComponent from '../../common/xMixin'
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

