<template>
    <div>
        <form-design ref="formDesign">
            <template v-slot:action>
                <el-button type="text" icon="el-icon-check" @click="btnSave">保存</el-button>
            </template>
        </form-design>
    </div>
</template>
<script>
    import {getAction, putAction} from '@/api/manage'
    import {Message} from 'element-ui'
    import FormDesign from "./FormDesign";

    export default {
        name: 'FlowableFormEdit',
        components: {FormDesign},
        data() {
            return {
                formKey: undefined,
                formData: {
                    formKey: undefined,
                    formName: '',
                    formJson: ''
                }
            }
        },
        created() {
            if (this.$route.query && this.$route.query.formKey) {
                this.formKey = this.$route.query.formKey
            }
            this.getFormData()
        },
        methods: {
            getFormData() {
                if (!this.formKey) {
                    Message.error('formKey is null')
                    return
                }
                getAction('/flowable/form/queryById', {id: this.formKey}).then(({data}) => {
                    this.formData = data
                    let json = this.formData?.formJson
                    setTimeout(() => this.$refs.formDesign.setJSON(json?JSON.parse(json):undefined), 100)
                })
            },
            btnSave() {
                this.formData.formJson = JSON.stringify(this.$refs.formDesign.getJSON())
                putAction('/flowable/form/update', this.formData).then(({msg, data}) => {
                    Message.success(msg)
                })
            }
        }
    }
</script>