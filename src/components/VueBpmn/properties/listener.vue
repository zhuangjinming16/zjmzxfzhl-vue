<template>
    <el-drawer :title="title" :visible.sync="_listenerDrawer" direction="rtl" @open="init">
        <div style="padding: 10px;">
            <el-table ref="listenersRef" :data="listeners" border fit highlight-current-row @row-click="editListener">
                <el-table-column prop="eventType" label="事件" align="center"/>
                <el-table-column prop="listenerType" label="类型" align="center">
                    <template slot-scope="scope">
                        <span>{{ listenerType[scope.row.listenerType] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button icon="el-icon-delete" @click.native.stop="deleteListener(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="showForm">
                <el-divider></el-divider>
                <el-form :model="listener" label-width="80px">
                    <el-form-item label="事件类型">
                        <el-select v-model="listener.eventType" placeholder="请选择">
                            <el-option
                                    v-for="item in eventTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                            </el-select>

                    </el-form-item>
                    <el-form-item label="监听类型">
                        <el-select v-model="listener.listenerType" placeholder="请选择">
                            <el-option
                                    v-for="item in listenerTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="值" prop="value">
                        <el-input v-model="listener.value"/>
                    </el-form-item>
                    <el-form-item label="参数">
                        <el-badge :value="listenerParams.length">
                            <el-button @click="editListenerParams">编辑</el-button>
                        </el-badge>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align:right;padding: 10px;">
            <el-button icon="el-icon-plus" type="primary" @click="addListener">添加</el-button>
            <el-button icon="el-icon-close" @click="_listenerDrawer = false">取消</el-button>
            <el-button icon="el-icon-check" type="primary" @click="save">确定</el-button>
        </div>

        <listener-param title="参数维护" @changeListenerParamsDrawer="changeListenerParamsDrawer" @saveListenerParams="saveListenerParams" :listenerParamsDrawer="listenerParamsDrawer" :listenerParams="listenerParams"></listener-param>
    </el-drawer>
</template>

<script>
    import mixinPanel from '../mixins/mixinPanel'
    import ListenerParam from "./listenerParam"
    import {randomString} from '@/utils/util'

    export default {
        components: {ListenerParam},
        props: {
            listenerDrawer: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'Execution'
            }
        },
        mixins: [mixinPanel],
        computed: {
            _listenerDrawer: {
                get() {
                    return this.listenerDrawer
                },
                set(v) {
                    this.$emit("changeListenerDrawer", v)
                }
            }
        },
        data() {
            return {
                listeners: [],
                listenerType: {
                    class: '类',
                    expression: '表达式',
                    delegateExpression: '代理表达式'
                },
                excutionEventTypes: [
                    {value: 'start', label: 'start'},
                    {value: 'take', label: 'take'},
                    {value: 'end', label: 'end'}
                ],
                taskEventTypes: [
                    { value: 'create', label: 'create' },
                    { value: 'assignment', label: 'assignment' },
                    { value: 'complete', label: 'complete' },
                    { value: 'delete', label: 'delete' }
                ],
                eventTypes: this.type === 'Execution' ? this.excutionEventTypes : this.taskEventTypes,
                listenerTypes: [
                    {value: 'class', label: '类'},
                    {value: 'expression', label: '表达式'},
                    {value: 'delegateExpression', label: '代理表达式'}
                ],
                listener: {
                    id: '',
                    eventType: 'start',
                    listenerType: 'class',
                    value: ''
                },
                showForm: false,
                listenerParamsDrawer: false,
                listenerParams: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init(){
                this.eventTypes = this.type === 'Execution' ? this.excutionEventTypes : this.taskEventTypes,
                this.showForm = false
                this.listener = {
                    id: '',
                    eventType: 'start',
                    listenerType: 'class',
                    value: ''
                }
                this.listeners = this.element.businessObject.extensionElements?.values
                    .filter(item => item.$type === (this.descriptorPrefix + this.type + 'Listener'))
                    .map(item => {
                        let type
                        if ('class' in item) type = 'class'
                        if ('expression' in item) type = 'expression'
                        if ('delegateExpression' in item) type = 'delegateExpression'
                        return {
                            eventType: item.event,
                            listenerType: type,
                            value: item[type],
                            params: item.fields?.map(field => {
                                let fieldType,value
                                if ('string' in field) {
                                    fieldType = 'string'
                                    value = field.string.body
                                }
                                if ('expression' in field) {
                                    fieldType = 'expression'
                                    value = field.expression.body
                                }
                                return {
                                    name: field.name,
                                    paramType: fieldType,
                                    value: value
                                }
                            }) ?? []
                        }
                    }) ?? []
            },
            addListener() {
                this.showForm = true
                let val = {
                    id: randomString(),
                    eventType: undefined,
                    listenerType: undefined,
                    value: ''
                }
                this.listeners.push(val)
                this.listener = val
                this.$refs['listenersRef'].setCurrentRow(val, true)
                this.listenerParams = []
            },
            deleteListener(row) {
                let index = this.listeners.indexOf(row)
                this.listeners.splice(index, 1)
                this.showForm = false
                this.listenerParams = []
            },
            editListener(row) {
                this.showForm = true
                this.listener = row
                let index = this.listeners.indexOf(this.listener)
                this.listenerParams = this.listeners[index]?.params ?? []
            },
            editListenerParams(){
                this.listenerParamsDrawer = true
            },
            changeListenerParamsDrawer(v){
                this.listenerParamsDrawer = v;
            },
            saveListenerParams(v){
                let index = this.listeners.indexOf(this.listener)
                this.listeners[index].params = v
                this.listenerParams = v
            },
            save() {
                let extensionElements = this.element.businessObject.get('extensionElements')
                if (!extensionElements) {
                    extensionElements = this.modeler.get('moddle').create('bpmn:ExtensionElements')
                }
                extensionElements.values = extensionElements.values?.filter(item => item.$type !== (this.descriptorPrefix + this.type + 'Listener')) ?? []
                this.listeners.forEach(item => {
                    const listener = this.modeler.get('moddle').create(this.descriptorPrefix + this.type + 'Listener')
                    listener['event'] = item.eventType
                    listener[item.listenerType] = item.value
                    if (item.params && item.params.length) {
                        item.params.forEach(field => {
                            const fieldElement = this.modeler.get('moddle').create(this.descriptorPrefix + 'Field')
                            fieldElement['name'] = field.name
                            // fieldElement[field.type] = field.value
                            // 注意：flowable.json 中定义的string和expression类为小写，不然会和原生的String类冲突，此处为hack
                            const valueElement = this.modeler.get('moddle').create(this.descriptorPrefix + field.paramType, { body: field.value })
                            // fieldElement[field.type] = valueElement
                            fieldElement.set(field.paramType, valueElement)
                            // fieldElement.push(valueElement)
                            listener.get('fields').push(fieldElement)
                        })
                    }
                    extensionElements.get('values').push(listener)
                })
                this.updateProperties({extensionElements: extensionElements.get('values')?.length == 0 ? undefined : extensionElements})
                this._listenerDrawer = false
                this.$emit("saveListener", this.listeners?.length)
            }
        }
    }
</script>

<style>
    .el-badge__content.is-fixed {
        top: 12px;
    }
</style>
