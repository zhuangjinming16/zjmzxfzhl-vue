<template>
    <div>
        <el-form ref="refForm" :model="formData" :rules="rules" label-width="75px">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <span class="el_title">基本设置<i class="header-icon el-icon-info"/></span>
                    </template>

                    <el-form-item label="节点ID" prop="id">
                        <el-input v-model="formData.id" clearable/>
                    </el-form-item>
                    <el-form-item label="节点名称" prop="name">
                        <el-input v-model="formData.name" clearable/>
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input v-model="formData.documentation" :rows="3" type="textarea" clearable/>
                    </el-form-item>

                    <el-form-item v-if="!!showConfig.taskCategory" label="任务分类" prop="taskCategory">
                        <el-select v-model="formData.category">
                            <el-option v-for="item in this.taskCategory" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="!!showConfig.conditionExpression" label="流转条件" prop="conditionExpression">
                        <el-input v-model="formData.conditionExpression" clearable/>
                    </el-form-item>

                    <el-form-item v-if="!!showConfig.async" label="异步" prop="async">
                        <el-switch v-model="formData.async"></el-switch>
                    </el-form-item>

                    <el-form-item v-if="!!showConfig.multiInstance" label="多实例">
                        <el-badge :is-dot="hasMultiInstance">
                            <el-button @click="multiInstanceDrawer = true">编辑</el-button>
                        </el-badge>
                    </el-form-item>

                </el-collapse-item>
                <el-collapse-item v-if="!!showConfig.candidate" name="2">
                    <template slot="title">
                        <span class="el_title">候选配置<i class="header-icon el-icon-info"/></span>
                    </template>
                    <el-form-item v-if="!!showConfig.initiator" label="创建者" prop="initiator">
                        <el-input v-model="formData.initiator" clearable/>
                    </el-form-item>
                    <el-form-item v-if="!!showConfig.assignee" label="执行人">
                        <el-input v-model="formData.assignee" clearable/>
                    </el-form-item>
                    <el-form-item v-if="!!showConfig.candidateUsers" label="候选用户">
                        <el-input v-model="formData.candidateUsers" clearable/>
                    </el-form-item>
                    <el-form-item v-if="!!showConfig.candidateGroups" label="候选组">
                        <el-input v-model="formData.candidateGroups" clearable/>
                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item v-if="!!showConfig.form" name="3">
                    <template slot="title">
                        <span class="el_title">表单配置<i class="header-icon el-icon-info"/></span>
                    </template>
                    <el-form-item v-if="!!showConfig.formKey" label="表单Key">
                        <el-input v-model="formData.formKey" clearable/>
                    </el-form-item>
                </el-collapse-item>

                <el-collapse-item name="4">
                    <template slot="title">
                        <span class="el_title">监听器<i class="header-icon el-icon-info"/></span>
                    </template>
                    <el-form-item label="执行监听">
                        <el-badge :value="executionListenerLength">
                            <el-button @click="executionListenerDrawer = true">编辑</el-button>
                        </el-badge>
                    </el-form-item>
                    <el-form-item v-if="!!showConfig.taskListener" label="任务监听">
                        <el-badge :value="taskListenerLength">
                            <el-button @click="taskListenerDrawer = true">编辑</el-button>
                        </el-badge>
                    </el-form-item>
                </el-collapse-item>

            </el-collapse>
        </el-form>

        <multi-instance title="多实例" v-if="!!showConfig.multiInstance" :element="element" :modeler="modeler" @changeMultiInstanceDrawer="changeMultiInstanceDrawer" @saveMultiInstance="saveMultiInstance" :multiInstanceDrawer="multiInstanceDrawer"></multi-instance>
        <listener title="执行监听" type="Execution" :element="element" :modeler="modeler" @changeListenerDrawer="changeExecutionListenerDrawer" @saveListener="saveExecutionListener" :listenerDrawer="executionListenerDrawer"></listener>
        <listener title="任务监听" type="Task" :element="element" :modeler="modeler" @changeListenerDrawer="changeTaskListenerDrawer" @saveListener="saveTaskListener" :listenerDrawer="taskListenerDrawer"></listener>
    </div>
</template>

<script>
    import mixinPanel from '../mixins/mixinPanel'
    import MultiInstance from "../properties/multiInstance";
    import listener from "../properties/listener";

    export default {
        name: 'BpmnNode',
        components: {listener, MultiInstance},
        mixins: [mixinPanel],
        props: {
            taskCategory: {
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
                multiInstanceDrawer: false,
                hasMultiInstance: false,
                executionListenerDrawer: false,
                executionListenerLength: 0,
                taskListenerDrawer: false,
                taskListenerLength: 0
            }
        },
        watch: {
            'formData.initiator': function (val) {
                this.updateProperty('initiator', val, true)
            },
            'formData.category': function (val) {
                this.updateProperty('category', val, true)
            },
            'formData.formKey': function (val) {
                this.updateProperty('formKey', val, true)
            },
            'formData.async': function (val) {
                this.updateProperty('async', val, true)
            },
            'formData.conditionExpression': function (val) {
                if (val) {
                    const newCondition = this.modeler.get('moddle').create('bpmn:FormalExpression', {body: val})
                    this.updateProperties({conditionExpression: newCondition})
                } else {
                    this.updateProperties({conditionExpression: null})
                }
            },
            'formData.skipExpression': function (val) {
                this.updateProperty('skipExpression', val, true)
            },
            'formData.assignee': function (val) {
                this.updateProperty('assignee', val, true)
            },
            'formData.candidateUsers': function (val) {
                this.updateProperty('candidateUsers', val, true)
            },
            'formData.candidateGroups': function (val) {
                this.updateProperty('candidateGroups', val, true)
            },
            'formData.dueDate': function (val) {
                this.updateProperty('dueDate', val, true)
            },
            'formData.priority': function (val) {
                this.updateProperty('priority', val, true)
            },
            'formData.isForCompensation': function (val) {
                this.updateProperty('isForCompensation', val)
            },
            'formData.triggerable': function (val) {
                this.updateProperty('triggerable', val, true)
            },
            'formData.class': function (val) {
                this.updateProperty('class', val, true)
            },
            'formData.autoStoreVariables': function (val) {
                this.updateProperty('autoStoreVariables', val, true)
            },
            'formData.exclude': function (val) {
                this.updateProperty('exclude', val, true)
            },
            'formData.ruleVariablesInput': function (val) {
                this.updateProperty('ruleVariablesInput', val, true)
            },
            'formData.rules': function (val) {
                this.updateProperty('rules', val, true)
            },
            'formData.resultVariable': function (val) {
                this.updateProperty('resultVariable', val, true)
            }
        },
        created() {
            const data = {
                ...this.element.businessObject,
                ...this.element.businessObject.$attrs,
            }
            data.documentation = this.getDocumentation()
            data.conditionExpression = this.element.businessObject.conditionExpression?.body
            this.formData = data
            this.hasMultiInstance = this.element.businessObject.loopCharacteristics ? true : false
            this.executionListenerLength = this.element.businessObject.extensionElements?.values
                .filter(item => item.$type === (this.descriptorPrefix + 'ExecutionListener')).length ?? 0
            this.taskListenerLength = this.element.businessObject.extensionElements?.values
                .filter(item => item.$type === (this.descriptorPrefix + 'TaskListener')).length ?? 0
        },
        methods: {
            changeMultiInstanceDrawer(v){
                this.multiInstanceDrawer = v;
            },
            saveMultiInstance(v){
                this.hasMultiInstance = v
            },
            changeExecutionListenerDrawer(v){
                this.executionListenerDrawer = v;
            },
            saveExecutionListener(v){
                this.executionListenerLength = v
            },
            changeTaskListenerDrawer(v){
                this.taskListenerDrawer = v;
            },
            saveTaskListener(v){
                this.taskListenerLength = v
            }
        }
    }
</script>

<style lang="scss">

</style>