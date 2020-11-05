<template>
    <div>
        <el-form ref="refForm" :model="formData" :rules="rules" label-width="75px">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <span class="el_title">基本设置<i class="header-icon el-icon-info"/></span>
                    </template>

                    <el-form-item label="流程ID" prop="id">
                        <el-input v-model="formData.id" clearable/>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="formData.name" clearable/>
                    </el-form-item>

                    <el-form-item label="流程分类" prop="processCategory">
                        <el-select v-model="formData.processCategory">
                            <el-option v-for="item in this.processCategory" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <span class="el_title">候选配置<i class="header-icon el-icon-info"/></span>
                    </template>
                    <el-form-item label="候选用户">
                        <el-input v-model="formData.candidateStarterUsers" clearable/>
                    </el-form-item>
                    <el-form-item label="候选组">
                        <el-input v-model="formData.candidateStarterGroups" clearable/>
                    </el-form-item>
                </el-collapse-item>
            </el-collapse>
        </el-form>

    </div>
</template>

<script>
    import mixinPanel from '../mixins/mixinPanel'
    // import mixinExecutionListener from '../../common/mixinExecutionListener'

    export default {
        name: 'BpmnProcess',
        mixins: [mixinPanel],
        props: {
            processCategory: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                activeName: '1',
                formData: {},
                rules: {
                    id: [{required: true, message: '该项不能为空', trigger: 'change'}],
                    name: [{required: true, message: '该项不能为空', trigger: 'change'}]
                }
            }
        },
        computed: {},
        watch: {
            'formData.processCategory': function (val) {
                if (val === '') {
                    val = null
                }
                this.element.businessObject.$parent.targetNamespace = val
            },
            'formData.candidateStarterUsers': function (val) {
                this.updateProperty('candidateStarterUsers', val, true)
            },
            'formData.candidateStarterGroups': function (val) {
                this.updateProperty('candidateStarterGroups', val, true)
            }
        },
        created() {
            const data = {
                ...this.element.businessObject,
                ...this.element.businessObject.$attrs,
            }
            this.formData = this.convertDescriptorProperties(data)
            const targetNamespace = this.element.businessObject.$parent.targetNamespace
            this.formData = {
                ...data,
                ...{processCategory: targetNamespace}
            }
        }
    }
</script>

<style lang="scss">

</style>