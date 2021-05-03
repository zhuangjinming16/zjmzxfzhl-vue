<template>
    <div>
        <fm-generate-form v-if="formDesignType=='formMaking'" :data="data" :value="value" ref="formMaking">
        </fm-generate-form>
        <parser v-if="formDesignType=='formGenerator'" :form-conf="data" :value="value" ref="formGenerator"/>
    </div>
</template>
<script>
    import FormGenerator from "@/components/FormGenerator"
    import Parser from '@/components/FormGenerator/components/parser'
    import defaultSettings from '@/settings'

    export default {
        name: 'FormParser',
        components: {FormGenerator,Parser},
        props: ['data', 'value'],
        data() {
            return {}
        },
        computed: {
            formDesignType() {
                // return 'formMaking'
                // return 'formGenerator'
                return defaultSettings.formDesignType
            }
        },
        methods: {
            getData() {
                if(this.formDesignType == 'formMaking'){
                    return this.$refs[this.formDesignType].getData()
                }else if(this.formDesignType == 'formGenerator'){
                    return this.$refs[this.formDesignType].getData()
                }
                return null
            },
            resetFields() {
                if(this.formDesignType == 'formMaking'){
                    this.$refs[this.formDesignType].reset()
                }else if(this.formDesignType == 'formGenerator'){
                    this.$refs[this.formDesignType].resetForm()
                }
            }
        }
    }
</script>