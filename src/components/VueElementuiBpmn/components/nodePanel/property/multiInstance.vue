<template>
    <div>
        <el-dialog title="多实例配置" :visible.sync="dialogVisible" @closed="$emit('close')">
            <x-form ref="xForm" v-model="formData" :config="formConfig"/>
            <div slot="footer" class="dialog-footer">
                <el-button icon="el-icon-close" @click="dialogVisible = false">取消</el-button>
                <el-button icon="el-icon-check" type="primary"
                           @click="save">确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import mixinPanel from '../../../common/mixinPanel'

    export default {
        mixins: [mixinPanel],
        data() {
            return {
                dialogVisible: true,
                formData: {}
            }
        },
        computed: {
            formConfig() {
                const _this = this
                return {
                    inline: false,
                    item: [
                        {
                            xType: 'radio',
                            name: 'isSequential',
                            label: '执行方式',
                            dic: [
                                {
                                    label: '单实例',
                                    value: undefined
                                },
                                {
                                    label: '串行',
                                    value: true},
                                {
                                    label: '并行',
                                    value: false
                                }
                            ]
                        },
                        {
                            xType: 'input',
                            name: 'loopCardinality',
                            label: '循环基数'
                            // tooltip: ''
                        },
                        {
                            xType: 'input',
                            name: 'collection',
                            label: '集合'
                            //tooltip: '属性会作为表达式进行解析。如果表达式解析为字符串而不是一个集合，<br />不论是因为本身配置的就是静态字符串值，还是表达式计算结果为字符串，<br />这个字符串都会被当做变量名，并从流程变量中用于获取实际的集合。'
                        },
                        {
                            xType: 'input',
                            name: 'elementVariable',
                            label: '元素变量'
                            //tooltip: '每创建一个用户任务前，先以该元素变量为label，集合中的一项为value，<br />创建（局部）流程变量，该局部流程变量被用于指派用户任务。<br />一般来说，该字符串应与指定人员变量相同。'
                        },
                        {
                            xType: 'input',
                            name: 'completionCondition',
                            label: '完成条件'
                            //tooltip: '多实例活动在所有实例都完成时结束，然而也可以指定一个表达式，在每个实例<br />结束时进行计算。当表达式计算为true时，将销毁所有剩余的实例，并结束多实例<br />活动，继续执行流程。例如 ${nrOfCompletedInstances/nrOfInstances >= 0.6 }，<br />表示当任务完成60%时，该节点就算完成'
                        }
                    ]
                }
            }
        },
        mounted() {
            const loopCharacteristics = this.element.businessObject?.loopCharacteristics
            const isSequential = loopCharacteristics === undefined ? undefined : (loopCharacteristics.isSequential ?? false)
            const cache = JSON.parse(JSON.stringify(loopCharacteristics?.$attrs ?? {}))
            cache.isSequential = isSequential
            cache.loopCardinality = loopCharacteristics?.loopCardinality?.body
            cache.completionCondition = loopCharacteristics?.completionCondition?.body
            // 移除flowable前缀，格式化数组
            for (const key in cache) {
                if (key.indexOf('flowable:') === 0) {
                    const newKey = key.replace('flowable:', '')
                    cache[newKey] = cache[key]
                    delete cache[key]
                }
            }
            this.formData = cache
        },
        methods: {
            updateElement() {
                if(this.formData.isSequential === undefined){
                    delete this.element.businessObject.loopCharacteristics
                    this.formData = {}
                    this.updateProperties({loopCharacteristics: undefined})
                    return
                }
                let loopCharacteristics = this.element.businessObject.loopCharacteristics
                if (!loopCharacteristics) {
                    loopCharacteristics = this.modeler.get('moddle').create('bpmn:MultiInstanceLoopCharacteristics')
                }
                if(this.formData.isSequential !== undefined){
                    loopCharacteristics.isSequential = this.formData.isSequential
                }
                if(this.formData.collection){
                    loopCharacteristics.$attrs['flowable:collection'] = this.formData.collection
                }
                if(this.formData.elementVariable){
                    loopCharacteristics.$attrs['flowable:elementVariable'] = this.formData.elementVariable
                }
                if (this.formData.loopCardinality) {
                    const loopCardinality = this.modeler.get('moddle').create('bpmn:Expression', {body: this.formData.loopCardinality})
                    loopCharacteristics['loopCardinality'] = loopCardinality
                }
                if (this.formData.completionCondition) {
                    const completionCondition = this.modeler.get('moddle').create('bpmn:Expression', {body: this.formData.completionCondition})
                    loopCharacteristics['completionCondition'] = completionCondition
                }
                this.updateProperties({loopCharacteristics})
            },
            save() {
                this.updateElement()
                this.dialogVisible = false
            }
        }
    }
</script>

<style>
    .muti-instance .el-form-item {
        margin-bottom: 22px;
    }
</style>
