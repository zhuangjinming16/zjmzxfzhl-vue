<template>
    <div>
        <el-drawer :visible.sync="_multiInstanceDrawer" direction="rtl">
            <div style="padding: 10px;">
                <el-form ref="multiInstanceForm" :model="multiInstance" label-width="80px">
                    <el-form-item label="多实例类型">
                        <el-select v-model="multiInstance.isSequential" clearable>
                            <el-option
                                    v-for="item in multiInstanceOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="循环基数" prop="loopCardinality">
                        <el-input v-model="multiInstance.loopCardinality" clearable/>
                    </el-form-item>
                    <el-form-item label="集合">
                        <el-input v-model="multiInstance.collection" clearable/>
                    </el-form-item>
                    <el-form-item label="元素变量">
                        <el-input v-model="multiInstance.elementVariable" clearable/>
                    </el-form-item>
                    <el-form-item label="完成条件">
                        <el-input v-model="multiInstance.completionCondition" clearable/>
                    </el-form-item>
                </el-form>
                <div style="text-align:right">
                    <el-button icon="el-icon-close" @click="_multiInstanceDrawer = false">取消</el-button>
                    <el-button icon="el-icon-check" type="primary" @click="save">确定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import mixinPanel from '../mixins/mixinPanel'

    export default {
        props: {
            multiInstanceDrawer: {
                type: Boolean,
                default: false
            }
        },
        mixins: [mixinPanel],
        computed: {
            _multiInstanceDrawer:{
                get(){
                    return this.multiInstanceDrawer
                },
                set(v){
                    this.$emit("changeMultiInstanceDrawer",v)
                }
            }
        },
        data() {
            return {
                multiInstanceOptions: [
                    {
                        value: undefined,
                        label: ''
                    },
                    {
                        value: true,
                        label: '串行'
                    },
                    {
                        value: false,
                        label: '并行'
                    }
                ],
                multiInstance: {
                    isSequential: '',
                    loopCardinality: '',
                    collection: '',
                    elementVariable: '',
                    completionCondition: '',
                },
            }
        },
        mounted() {
            const loopCharacteristics = this.element.businessObject?.loopCharacteristics
            const isSequential = loopCharacteristics === undefined ? undefined : (loopCharacteristics.isSequential ?? false)
            const data = {}
            data.isSequential = isSequential
            data.collection = loopCharacteristics?.collection
            data.elementVariable = loopCharacteristics?.elementVariable
            data.loopCardinality = loopCharacteristics?.loopCardinality?.body
            data.completionCondition = loopCharacteristics?.completionCondition?.body

            this.multiInstance = data
        },
        methods: {
            save() {
                let hasMultiInstance = false
                if(this.multiInstance.isSequential === undefined || this.multiInstance.isSequential === ''){
                    delete this.element.businessObject.loopCharacteristics
                    this.multiInstance = {}
                    this.updateProperties({loopCharacteristics: undefined})
                }else{
                    let loopCharacteristics = this.element.businessObject.loopCharacteristics
                    if (!loopCharacteristics) {
                        loopCharacteristics = this.modeler.get('moddle').create('bpmn:MultiInstanceLoopCharacteristics')
                    }

                    loopCharacteristics.isSequential = this.multiInstance.isSequential

                    if(this.multiInstance.collection){
                        loopCharacteristics.set(this.descriptorPrefix + 'collection',this.multiInstance.collection)
                    }
                    if(this.multiInstance.elementVariable){
                        loopCharacteristics.set(this.descriptorPrefix + 'elementVariable',this.multiInstance.elementVariable)
                    }
                    if (this.multiInstance.loopCardinality) {
                        const loopCardinality = this.modeler.get('moddle').create('bpmn:Expression', {body: this.multiInstance.loopCardinality})
                        loopCharacteristics['loopCardinality'] = loopCardinality
                    }
                    if (this.multiInstance.completionCondition) {
                        const completionCondition = this.modeler.get('moddle').create('bpmn:Expression', {body: this.multiInstance.completionCondition})
                        loopCharacteristics['completionCondition'] = completionCondition
                    }
                    this.updateProperties({loopCharacteristics})
                    hasMultiInstance = true
                }
                this._multiInstanceDrawer = false
                this.$emit("saveMultiInstance", hasMultiInstance)
            }
        }
    }
</script>

<style>
    /*.muti-instance .el-form-item {
        margin-bottom: 22px;
    }*/
</style>
