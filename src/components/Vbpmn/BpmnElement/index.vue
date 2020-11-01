<template>
    <div ref="propertyPanel" class="property-panel">
        <div v-if="nodeName">{{ nodeName }}</div>
        <component
                ref="_component"
                :is="getComponent"
                v-if="element"
                :element="element"
                :modeler="modeler"
                :processCategory="processCategory"
                :taskCategory="taskCategory"
        />
    </div>
</template>

<script>
    import bpmnProcess from './BpmnProcess'
    import bpmnNode from './BpmnNode'
    import {NodeName} from '../translate/lang/zh'

    export default {
        name: 'Element',
        components: {bpmnProcess, bpmnNode},
        props: {
            processCategory: {
                type: Array,
                required: true
            },
            taskCategory: {
                type: Array,
                required: true
            },
            modeler: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                element: null,
                form: {
                    id: '',
                    name: '',
                    color: null
                }
            }
        },
        computed: {
            getComponent() {
                const type = this.element?.type
                if (type === 'bpmn:Process') {
                    return 'bpmnProcess'
                } else {
                    return 'bpmnNode'
                }
                return null
            },
            nodeName() {
                if (this.element) {
                    const bizObj = this.element.businessObject
                    const type = bizObj?.eventDefinitions
                        ? bizObj.eventDefinitions[0].$type
                        : bizObj.$type
                    return NodeName[type] || type
                }
                return ''
            }
        },
        mounted() {
            this.handleModeler()
        },
        methods: {
            handleModeler() {
                this.modeler.on('root.added', e => {
                    if (e.element.type === 'bpmn:Process') {
                        this.element = null
                        this.$nextTick().then(() => {
                            this.element = e.element
                        })
                    }
                })
                this.modeler.on('element.click', e => {
                    const {element} = e
                    // console.log(element)
                    if (element.type === 'bpmn:Process') {
                        this.element = element
                    }
                })
                this.modeler.on('selection.changed', e => {
                    // hack 同类型面板不刷新
                    this.element = null
                    const element = e.newSelection[0]
                    if (element) {
                        this.$nextTick().then(() => {
                            this.element = element
                        })
                    }
                })
            },
            validate() {
                return this.$refs._component?.validate();
            }
        }
    }
</script>

<style lang="scss">
    .property-panel {
        padding: 5px 5px;
        // reset element css
        .el-form--label-top .el-form-item__label {
            padding: 0;
        }

        .tab-table .el-form-item {
            margin-bottom: 16px;
        }
        .node-name {
            border-bottom: 1px solid #ccc;
            padding: 0 0 10px 20px;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: bold;
            color: #444;
        }
    }
</style>
