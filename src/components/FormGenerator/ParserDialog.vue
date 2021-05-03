<template>
  <div>
    <el-dialog 
      v-bind="$attrs"
      width="500px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      @open="onOpen"
      v-on="$listeners"
    >
      <parser v-if="isShowParser" :form-conf="innerFormConf" ref="parser" @submit="submit"/>

      <div slot="footer">
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="getFormData">
          获取数据
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Parser from '@/components/FormGenerator/components/parser'
import { Message, MessageBox } from 'element-ui'

export default {
  name: "ParserDialog",
  components: {
    Parser
  },
  inheritAttrs: false,
  props: ['formConf'],
  data() {
    return {
      innerFormConf: this.formConf.Parser,
      // 防止模型应重新渲染parser
      isShowParser: true
    }
  },
  computed: {
  },
  watch: {
    formConf(val){
      this.innerFormConf = val
    }
  },
  mounted() {
  },
  methods: {
    onOpen(){
      this.isShowParser = true
    },
    close(e) {
      this.isShowParser = false
      this.$emit('update:visible', false)
    },
    getFormData() {
      this.$refs.parser.submitForm();
    },
    submit(data) {
      this.$msgbox.alert(JSON.stringify(data))
    }
  }
}
</script>
