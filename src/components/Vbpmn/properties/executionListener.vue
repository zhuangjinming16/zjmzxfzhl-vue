<template>
    <el-drawer :visible.sync="_executionListenerDrawer" direction="rtl">

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
                        <!--<i class="el-icon-edit el-icon&#45;&#45;center" style="cursor: pointer;" @click="editListener(row)"></i>-->
                        <!--<i class="el-icon-delete el-icon&#45;&#45;center" style="cursor: pointer;" @click.native.stop="deleteListener(row)"></i>-->
                        <el-button icon="el-icon-delete" @click.native.stop="deleteListener(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="showForm">
                <el-divider style="margin: 10px 0"></el-divider>
                <el-form :model="executionListener" label-width="80px" style="padding: 10px;">
                    <el-form-item label="事件类型">
                        <el-select v-model="executionListener.eventType" placeholder="请选择">
                            <el-option
                                    v-for="item in eventTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="监听类型">
                        <el-select v-model="executionListener.listenerType" placeholder="请选择">
                            <el-option
                                    v-for="item in listenerTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="值" prop="value">
                        <el-input v-model="executionListener.value"/>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align:right;padding: 10px;">
            <el-button icon="el-icon-plus" type="primary" @click="addListener">添加</el-button>
            <el-button icon="el-icon-close" @click="_executionListenerDrawer = false">取消</el-button>
            <el-button icon="el-icon-check" type="primary" @click="save">确定</el-button>
        </div>
    </el-drawer>
</template>

<script>
    import mixinPanel from '../mixins/mixinPanel'

    export default {
        props: {
            executionListenerDrawer: {
                type: Boolean,
                default: false
            }
        },
        mixins: [mixinPanel],
        computed: {
            _executionListenerDrawer: {
                get() {
                    return this.executionListenerDrawer
                },
                set(v) {
                    this.init()
                    this.$emit("changeExecutionListenerDrawer", v)
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
                eventTypes: [
                    {value: 'start', label: 'start'},
                    {value: 'take', label: 'take'},
                    {value: 'end', label: 'end'}
                ],
                listenerTypes: [
                    {value: 'class', label: '类'},
                    {value: 'expression', label: '表达式'},
                    {value: 'delegateExpression', label: '代理表达式'}
                ],
                executionListener: {
                    id: '',
                    eventType: 'start',
                    listenerType: 'class',
                    value: ''
                },
                showForm: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init(){
                this.showForm = false
                this.executionListener = {
                    id: '',
                    eventType: 'start',
                    listenerType: 'class',
                    value: ''
                }
                this.listeners = this.element.businessObject.extensionElements?.values
                    .filter(item => item.$type === (this.descriptorPrefix + 'ExecutionListener'))
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
                                let fieldType
                                if ('stringValue' in field) fieldType = 'stringValue'
                                if ('expression' in field) fieldType = 'expression'
                                return {
                                    name: field.name,
                                    type: fieldType,
                                    value: field[fieldType]
                                }
                            }) ?? []
                        }
                    }) ?? []
            },
            randomString(len) {
                len = len || 32
                const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
                /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                const maxPos = $chars.length
                let pwd = ''
                for (let i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
                }
                return pwd
            },
            addListener() {
                this.showForm = true
                let val = {
                    id: this.randomString(),
                    eventType: 'start',
                    listenerType: 'class',
                    value: ''
                }
                this.listeners.push(val)
                this.executionListener = val
                this.$refs['listenersRef'].setCurrentRow(val, true)
            },
            deleteListener(row) {
                let index = this.listeners.indexOf(row)
                this.listeners.splice(index, 1)
                this.showForm = false
            },
            editListener(row) {
                this.showForm = true
                this.executionListener = row
            },
            save() {
                let extensionElements = this.element.businessObject.get('extensionElements')
                if (!extensionElements) {
                    extensionElements = this.modeler.get('moddle').create('bpmn:ExtensionElements')
                }
                extensionElements.values = extensionElements.values?.filter(item => item.$type !== (this.descriptorPrefix + 'ExecutionListener')) ?? []
                this.listeners.forEach(item => {
                    const executionListener = this.modeler.get('moddle').create(this.descriptorPrefix + 'ExecutionListener')
                    executionListener['event'] = item.eventType
                    executionListener[item.listenerType] = item.value
                    if (item.params && item.params.length) {
                        item.params.forEach(field => {
                            const fieldElement = this.modeler.get('moddle').create('flowable:Field')
                            fieldElement['name'] = field.name
                            fieldElement[field.type] = field.value
                            // 注意：flowable.json 中定义的string和expression类为小写，不然会和原生的String类冲突，此处为hack
                            // const valueElement = this.modeler.get('moddle').create(`flowable:${field.type}`, { body: `<![CDATA[${field.value}]]>` })
                            // fieldElement[field.type] = valueElement
                            executionListener.get('fields').push(fieldElement)
                        })
                    }
                    extensionElements.get('values').push(executionListener)
                })
                this.updateProperties({extensionElements: extensionElements.get('values')?.length == 0 ? undefined : extensionElements})
                this._executionListenerDrawer = false
                this.$emit("saveExecutionListener", this.listeners?.length)
            }
        }
    }
</script>

<style>
    .el-badge__content.is-fixed {
        top: 12px;
    }
</style>
