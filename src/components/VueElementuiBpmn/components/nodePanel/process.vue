<template>
    <div>
        <x-form ref="xForm" v-model="formData" :config="formConfig">
            <template #executionListener>
                <el-badge :value="executionListenerLength">
                    <el-button size="small" @click="dialogName = 'executionListenerDialog'">编辑</el-button>
                </el-badge>
            </template>
        </x-form>
        <executionListenerDialog
                v-if="dialogName === 'executionListenerDialog'"
                :element="element"
                :modeler="modeler"
                @close="finishExecutionListener"
        />
    </div>
</template>

<script>
    import mixinPanel from '../../common/mixinPanel'
    import mixinExecutionListener from '../../common/mixinExecutionListener'

    export default {
        mixins: [mixinPanel, mixinExecutionListener],
        props: {
            processCategory: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
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
                            xType: 'select',
                            name: 'processCategory',
                            label: '流程分类',
                            dic: {data: _this.processCategory, label: 'name', value: 'id'}
                        },
                        {
                            xType: 'input',
                            name: 'id',
                            label: '流程标识key',
                            rules: [
                                {required: true, message: '流程标识key不能为空'},
                                {pattern: /^[a-z_][\w-.]*$/i, message: '流程标识key格式不正确'}
                            ]
                        },
                        {
                            xType: 'input',
                            name: 'name',
                            label: '流程名称'
                        },
                        {
                            xType: 'colorPicker',
                            name: 'color',
                            label: '节点颜色',
                            show: false
                        },
                        {
                            xType: 'slot',
                            name: 'executionListener',
                            label: '执行监听器'
                        }
                    ]
                }
            }
        },
        watch: {
            'formData.processCategory': function (val) {
                if (val === '') val = null
                this.element.businessObject.$parent.targetNamespace = val
            }
        },
        created() {
            const cache = {
                ...this.element.businessObject,
                ...this.element.businessObject.$attrs,
            }
            // 移除flowable前缀，格式化数组
            for (const key in cache) {
                if (key.indexOf('flowable:') === 0) {
                    const newKey = key.replace('flowable:', '')
                    cache[newKey] = cache[key]
                    delete cache[key]
                }
            }
            const targetNamespace = this.element.businessObject.$parent.targetNamespace
            this.formData = {
                ...cache,
                ...{processCategory: targetNamespace}
            }
        }
    }
</script>

<style>

</style>
