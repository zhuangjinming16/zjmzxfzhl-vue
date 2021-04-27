<template>
    <div>
        <el-form ref="refForm" :model="formData" :rules="rules" label-width="75px">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <span class="el_title">基本设置<i class="header-icon el-icon-info"/></span>
                    </template>

                    <el-form-item label="流程主键" prop="id">
                        <el-input v-model="formData.id" disabled="true"/>
                    </el-form-item>
                    <el-form-item label="流程名称" prop="name">
                        <el-input v-model="formData.name" clearable/>
                    </el-form-item>

                    <el-form-item label="流程描述">
                        <el-input v-model="formData.documentation" :rows="3" type="textarea" clearable/>
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
                    <el-form-item label="可发起者">
                        <el-input v-model="formData.candidateStarterUsers" clearable/>
                    </el-form-item>
                    <el-form-item label="可发起组">
                        <el-input v-model="formData.candidateStarterGroups" clearable/>
                    </el-form-item>
                </el-collapse-item>

                <el-collapse-item name="3">
                    <template slot="title">
                        <span class="el_title">监听器<i class="header-icon el-icon-info"/></span>
                    </template>
                    <el-form-item label="执行监听">
                        <el-badge :value="executionListenerLength">
                            <el-button @click="executionListenerDrawer = true">编辑</el-button>
                        </el-badge>
                    </el-form-item>
                </el-collapse-item>

                <el-collapse-item name="4">
                    <template slot="title">
                        <span class="el_title">附加属性<i class="header-icon el-icon-info"/></span>
                    </template>
                    <el-form-item label="附加属性">
                        <el-badge :value="propertiesLength">
                            <el-button @click="propertiesDrawer = true">编辑</el-button>
                        </el-badge>
                    </el-form-item>
                </el-collapse-item>
            </el-collapse>

        </el-form>

        <listener title="执行监听" type="Execution" :element="element" :modeler="modeler" @changeListenerDrawer="changeExecutionListenerDrawer" @saveListener="saveExecutionListener" :listenerDrawer="executionListenerDrawer"></listener>
        <properties title="属性" :element="element" :modeler="modeler" @changePropertiesDrawer="changePropertiesDrawer" @saveProperties="saveProperties" :propertiesDrawer="propertiesDrawer"></properties>

    </div>
</template>

<script>
    import mixinPanel from '../mixins/mixinPanel'
    import listener from "../properties/listener";
    import Properties from "../properties/properties";

    export default {
        name: 'BpmnProcess',
        components: {Properties, listener},
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
                },
                executionListenerDrawer: false,
                executionListenerLength: 0,
                propertiesDrawer: false,
                propertiesLength: 0,
            }
        },
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
            const targetNamespace = this.element.businessObject.$parent.targetNamespace
            data.processCategory = targetNamespace
            data.documentation = this.getDocumentation()

            this.formData = data

            this.executionListenerLength = this.element.businessObject.extensionElements?.values
                .filter(item => item.$type === (this.descriptorPrefix + 'ExecutionListener')).length ?? 0
            this.propertiesLength = this.element.businessObject.extensionElements?.values
                .filter(item => item.$type === (this.descriptorPrefix + 'Properties')).shift()?.values.length ?? 0
        },
        methods: {
            changeExecutionListenerDrawer(v){
                this.executionListenerDrawer = v;
            },
            saveExecutionListener(v){
                this.executionListenerLength = v
            },
            changePropertiesDrawer(v){
                this.propertiesDrawer = v;
            },
            saveProperties(v){
                this.propertiesLength = v
            }
        }
    }
</script>

<style lang="scss">

</style>