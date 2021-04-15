<template>
    <el-drawer :title="title" :visible.sync="_propertiesDrawer" direction="rtl" @open="init">
        <div style="padding: 10px;">
            <el-table ref="propertiesRef" :data="properties" border fit highlight-current-row @row-click="editProperty">
                <el-table-column prop="name" label="名称" align="center"/>
                <el-table-column prop="value" label="值" align="center"/>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button icon="el-icon-delete" @click.native.stop="deleteProperty(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="showForm">
                <el-divider></el-divider>
                <el-form :model="property" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="property.name"/>
                    </el-form-item>
                    <el-form-item label="值" prop="value">
                        <el-input v-model="property.value"/>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align:right;padding: 10px;">
            <el-button icon="el-icon-plus" type="primary" @click="addProperty">添加</el-button>
            <el-button icon="el-icon-close" @click="_propertiesDrawer = false">取消</el-button>
            <el-button icon="el-icon-check" type="primary" @click="save">确定</el-button>
        </div>
    </el-drawer>
</template>

<script>
    import mixinPanel from '../mixins/mixinPanel'
    import {randomString} from '@/utils/util'

    export default {
        props: {
            propertiesDrawer: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            }
        },
        mixins: [mixinPanel],
        computed: {
            _propertiesDrawer: {
                get() {
                    return this.propertiesDrawer
                },
                set(v) {
                    // this.init()
                    this.$emit("changePropertiesDrawer", v)
                }
            }
        },
        data() {
            return {
                properties: [],
                property: {
                    id: '',
                    name: '',
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
                this.property = {
                    id: '',
                    name: '',
                    value: ''
                }
                this.properties = this.element.businessObject.extensionElements?.values
                    .filter(item => item.$type === (this.descriptorPrefix + 'Properties'))
                    .shift()?.properties?.map(property => {
                        return {
                            name: property.name,
                            value: property.value
                        }
                    }) ?? []
            },
            addProperty() {
                this.showForm = true
                let val = {
                    id: randomString(),
                    name: '',
                    value: ''
                }
                this.properties.push(val)
                this.property = val
                this.$refs['propertiesRef'].setCurrentRow(val, true)
            },
            deleteProperty(row) {
                let index = this.properties.indexOf(row)
                this.properties.splice(index, 1)
                this.showForm = false
            },
            editProperty(row) {
                this.showForm = true
                this.property = row
            },
            save() {
                let extensionElements = this.element.businessObject.get('extensionElements')
                if (!extensionElements) {
                    extensionElements = this.modeler.get('moddle').create('bpmn:ExtensionElements')
                }
                extensionElements.values = extensionElements.values?.filter(item => item.$type !== (this.descriptorPrefix + 'Properties')) ?? []
                const propertiesElement = this.modeler.get('moddle').create(this.descriptorPrefix + 'Properties')
                this.properties.forEach(item => {
                    const propertyElement = this.modeler.get('moddle').create(this.descriptorPrefix + 'Property')
                    propertyElement['name'] = item.name
                    propertyElement['value'] = item.value
                    propertiesElement.get('properties').push(propertyElement)
                })
                extensionElements.get("values").push(propertiesElement)

                this.updateProperties({extensionElements: extensionElements.get('values')?.length == 0 ? undefined : extensionElements})
                this._propertiesDrawer = false
                this.$emit("saveProperties", this.properties?.length)
            }
        }
    }
</script>

<style>
    .el-badge__content.is-fixed {
        top: 12px;
    }
</style>
