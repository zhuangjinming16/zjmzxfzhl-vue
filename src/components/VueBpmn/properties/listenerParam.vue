<template>
    <el-drawer :title="title" :append-to-body="true" :visible.sync="_listenerParamsDrawer" direction="rtl" @open="init">
        <div style="padding: 10px;">
            <el-table ref="listenerParamsRef" :data="listenerParamsInner" border fit highlight-current-row @row-click="editListenerParam">
                <el-table-column prop="name" label="名称" align="center"/>
                <el-table-column prop="paramType" label="类型" align="center">
                    <template slot-scope="scope">
                        <span>{{ paramType[scope.row.paramType] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button icon="el-icon-delete" @click.native.stop="deleteListenerParam(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="showForm">
                <el-divider></el-divider>
                <el-form :model="listenerParam" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="listenerParam.name"/>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="listenerParam.paramType" placeholder="请选择">
                            <el-option
                                    v-for="item in paramTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="值" prop="value">
                        <el-input v-model="listenerParam.value"/>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align:right;padding: 10px;">
            <el-button icon="el-icon-plus" type="primary" @click="addListenerParam">添加</el-button>
            <el-button icon="el-icon-close" @click="_listenerParamsDrawer = false">取消</el-button>
            <el-button icon="el-icon-check" type="primary" @click="save">确定</el-button>
        </div>
    </el-drawer>
</template>

<script>
    import {randomString} from '@/utils/util'

    export default {
        props: {
            listenerParamsDrawer: {
                type: Boolean,
                default: false
            },
            listenerParams: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
        watch: {
            listenerParams(newVal){
                this.listenerParamsInner = newVal;
            }
        },
        computed: {
            _listenerParamsDrawer: {
                get() {
                    return this.listenerParamsDrawer
                },
                set(v) {
                    // this.init()
                    this.$emit("changeListenerParamsDrawer", v)
                }
            }
        },
        data() {
            return {
                listenerParamsInner: [],
                paramType: {
                    string: '字符串',
                    expression: '表达式'
                },
                paramTypes: [
                    {value: 'string', label: '字符串'},
                    {value: 'expression', label: '表达式'}
                ],
                listenerParam: {
                    id: '',
                    name: '',
                    paramType: 'string',
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
                this.listenerParamsInner = [... this.listenerParams]
                this.showForm = false
                this.listenerParam = {
                    id: '',
                    name: '',
                    paramType: 'string',
                    value: ''
                }
            },
            addListenerParam() {
                this.showForm = true
                let val = {
                    id: randomString(),
                    name: '',
                    paramType: 'string',
                    value: ''
                }
                this.listenerParamsInner.push(val)
                this.listenerParam = val
                this.$refs['listenerParamsRef'].setCurrentRow(val, true)
            },
            deleteListenerParam(row) {
                let index = this.listenerParamsInner.indexOf(row)
                this.listenerParamsInner.splice(index, 1)
                this.showForm = false
            },
            editListenerParam(row) {
                this.showForm = true
                this.listenerParam = row
            },
            save() {
                this._listenerParamsDrawer = false
                this.$emit("saveListenerParams", this.listenerParamsInner)
            }
        }
    }
</script>

<style>
    .el-badge__content.is-fixed {
        top: 12px;
    }
</style>
