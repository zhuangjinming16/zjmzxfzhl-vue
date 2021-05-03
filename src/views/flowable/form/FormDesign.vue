<template>
    <div>
        <fm-making-form class="form-making-height" v-if="formDesignType=='formMaking'" ref="formMaking" preview generate-json>
            <template #action><slot name="action"></slot></template>
        </fm-making-form>
        <form-generator v-if="formDesignType=='formGenerator'" ref="formGenerator">
            <template #action><slot name="action"></slot></template>
        </form-generator>
    </div>
</template>
<script>
    import FormGenerator from "@/components/FormGenerator"
    import defaultSettings from '@/settings'

    export default {
        name: 'FormDesign',
        components: {FormGenerator},
        data() {
            return {
                defaultJson: {
                    'formMaking':{"list": [], "config": {"labelWidth": 100, "labelPosition": "right", "size": "small"}},
                    'formGenerator':{"fields": [],"formRef": "elForm","formModel": "formData","size": "medium","labelPosition": "right","labelWidth": 100,"formRules": "rules","gutter": 15,"disabled": false,"span": 24,"formBtns": false}
                }
            }
        },
        computed: {
            formDesignType() {
                // return 'formMaking'
                // return 'formGenerator'
                return defaultSettings.formDesignType
            }
        },
        methods: {
            setJSON(json) {
                if(this.formDesignType == 'formMaking'){
                    this.$refs.formMaking.setJSON(json ? json : this.defaultJson['formMaking'])
                }else if(this.formDesignType == 'formGenerator'){
                    this.$refs.formGenerator.setJSON(json ? json : this.defaultJson['formGenerator'])
                }
            },
            getJSON() {
                let returnJson
                if(this.formDesignType == 'formMaking'){
                    returnJson = this.$refs.formMaking.getJSON()
                }else if(this.formDesignType == 'formGenerator'){
                    returnJson = this.$refs.formGenerator.getJSON()
                }
                return returnJson
            }
        }
    }
</script>

<style lang="scss">
    .form-making-height {
        height: calc(100vh - 84px);
    }
</style>