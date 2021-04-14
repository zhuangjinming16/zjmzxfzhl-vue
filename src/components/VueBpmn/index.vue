<template>
    <el-container v-loading="isView" class="fm2-container" :class="{ 'view-mode': isView }">
        <el-header height="45px">
            <el-button-group style="margin: 5px;">
                <el-button icon="el-icon-arrow-left" @click="handleUndo">撤回</el-button>
                <el-button icon="el-icon-arrow-right" @click="handleRedo">重做</el-button>
                <el-button icon="el-icon-circle-plus-outline" @click="handleZoom(0.2)">放大</el-button>
                <el-button icon="el-icon-help" @click="handleZoom(0)">还原</el-button>
                <el-button icon="el-icon-remove-outline" @click="handleZoom(-0.2)">缩小</el-button>
                <el-button icon="el-icon-upload2" @click="importXml">导入</el-button>
                <el-upload action="" :before-upload="openBpmn" style="display: none">
                    <el-button ref="importBtn" size="mini" icon="el-icon-folder-opened"/>
                </el-upload>
                <el-button icon="el-icon-download" @click="handleExportXmlAction">XML</el-button>
                <el-button icon="el-icon-download" @click="handleExportSvgAction">SVG
                </el-button>
                <el-button icon="el-icon-tickets" @click="handlePreviewXml">预览</el-button>
                <el-button icon="el-icon-delete" @click="handleClear">清空</el-button>

                <el-button v-permission="'flowable:model:save,flowable:model:update'" icon="el-icon-upload"
                           @click="handleSave">保存
                </el-button>
            </el-button-group>
        </el-header>
        <el-main class="fm2-main">
            <el-container class="center-container">
                <el-container class="containers">
                    <div class="canvas" ref="canvas"/>
                </el-container>
                <el-aside class="widget-config-container">
                    <bpmn-element ref="_bpmnElement" v-if="modeler" :modeler="modeler"
                                    :processCategory="processCategory" :taskCategory="taskCategory"/>
                </el-aside>
            </el-container>
        </el-main>
        <el-footer height="30px" style="font-weight: 600;">
            Powered by <a target="_blank" href="https://gitee.com/zjm16/zjmzxfzhl">zjmzxfzhl</a>
        </el-footer>

        <el-dialog :visible.sync="xmlVisible" title="预览" fullscreen center>
            <vue-ace-editor v-model="process.xml"
                            @init="editorInit"
                            lang="xml"
                            theme="chrome"
                            width="100%"
                            height="calc(100vh - 214px)"
                            :options="{wrap: true, readOnly: true}">
            </vue-ace-editor>
            <span slot="footer">
            <el-button icon="el-icon-document" type="primary" v-clipboard:copy="process.xml"
                       v-clipboard:success="onCopy">复 制</el-button>
            <el-button icon="el-icon-close" @click="xmlVisible = false">关闭</el-button>
        </span>
        </el-dialog>
    </el-container>

</template>

<script>
    // 汉化
    import translate from './translate/index'
    import Modeler from 'bpmn-js/lib/Modeler'
    import BpmnElement from './BpmnElement'
    // 引入flowable的节点文件
    import flowableModdle from './descriptors/flowable.json'
    import VueAceEditor from 'vue2-ace-editor'
    import newXml from './resources/newDiagram.js'
    import {Message} from 'element-ui'

    export default {
        name: 'VueBpmn',
        props: {
            isView: {
                type: Boolean,
                default: false
            },
            modelData: {
                type: Object,
                default: {
                    id: undefined,
                    key: 'processId_1',
                    name: 'processName_1',
                    category: 'category_1',
                    description: 'description_1'
                }
            }
        },
        components: {VueAceEditor, BpmnElement},
        data() {
            return {
                scale: 1,  //流程图比例（用于放大缩小）
                modeler: null,
                process: {
                    xml: '',
                    svg: ''
                },
                xmlVisible: false,
                idTest: /^[a-z_][\w-.]*$/i,
                processCategory: [],
                taskCategory: []
            }
        },
        mounted() {
            const _this = this
            this.getDicts('processCategory,taskCategory').then(({data}) => {
                _this.processCategory = data['processCategory']?.map(item => {
                    return {
                        id: item.value,
                        name: item.content
                    }
                }) ?? []

                _this.taskCategory = data['taskCategory']?.map(item => {
                    return {
                        id: item.value,
                        name: item.content
                    }
                }) ?? []

                const canvas = this.$refs.canvas
                // 生成实例
                this.modeler = new Modeler({
                    container: this.$refs.canvas,
                    additionalModules: [
                        {
                            translate: ['value', translate]
                        }
                    ],
                    moddleExtensions: {
                        flowable: flowableModdle
                    }
                })
                // 新增流程定义
                this.createNewDiagram(this.modelData?.editor)
            })
        },
        methods: {
            // init ace editor
            editorInit: function () {
                require('brace/ext/language_tools')
                require('brace/mode/xml')
                require('brace/theme/chrome')
            },
            getProcessElement() {
                return this.modeler.getDefinitions().rootElements[0]
            },
            getProcess() {
                const element = this.getProcessElement()
                return {
                    id: element.id,
                    name: element.name,
                    category: element.$parent.targetNamespace
                }
            },
            // 初始化流程图
            createNewDiagram(xml) {
                if (!xml) {
                    // 初始化XML文本
                    this.process.xml = newXml(this.modelData.key, this.modelData.name, this.modelData.category, this.modelData.description)
                } else {
                    this.process.xml = xml
                }
                // 将字符串转换成图显示出来
                this.modeler.importXML(this.process.xml, err => {
                    if (err) {
                        console.error(err)
                    } else {
                        // this.adjustPalette()
                    }
                })
            },
            // 当图发生改变的时候会调用这个函数，这个data就是图的xml
            setEncoded(type, data) {
                // 把xml转换为URI，下载要用到的
                const encodedData = encodeURIComponent(data)
                if (data) {
                    if (type === 'xml') {
                        // 获取到图的xml，保存就是把这个xml提交给后台
                        this.process.xml = data
                        return {
                            filename: this.process.name + '.bpmn20.xml',
                            href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
                            data: data
                        }
                    }
                    if (type === 'svg') {
                        this.process.svg = data
                        return {
                            filename: this.process.name + '.bpmn20.svg',
                            href: "data:application/text/xml;charset=UTF-8," + encodedData,
                            data: data
                        }
                    }
                }
            },
            // 导入
            importXml() {
                this.$refs.importBtn.$el.click()
            },
            // 导入文件选择完成
            openBpmn(file) {
                const reader = new FileReader()
                reader.readAsText(file, 'utf-8')
                reader.onload = () => {
                    this.createNewDiagram(reader.result)
                }
                return false
            },
            /**
             * 下载xml/svg
             *  @param  type  类型  svg / xml
             *  @param  data  数据
             *  @param  name  文件名称
             */
            download(type, data, name) {
                let dataTrack = ''
                const a = document.createElement('a')
                switch (type) {
                    case 'xml':
                        dataTrack = 'bpmn'
                        break
                    case 'svg':
                        dataTrack = 'svg'
                        break
                    default:
                        break
                }
                name = name || `diagram.${dataTrack}`
                a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`)
                a.setAttribute('target', '_blank')
                a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
                a.setAttribute('download', name)
                document.body.appendChild(a)
                a.click()
                URL.revokeObjectURL(a.href) // 释放URL 对象
                document.body.removeChild(a)
            },
            // 导出XML文件
            handleExportXmlAction() {
                const _this = this
                this.modeler.saveXML({format: true}, function (err, xml) {
                    xml = _this.replaceLtAndGt(xml)
                    _this.download('xml', xml, _this.getProcess().name + '.bpmn20.xml')
                })
            },
            // 导出SVG文件
            handleExportSvgAction() {
                const _this = this
                this.modeler.saveSVG({format: true}, function (err, svg) {
                    _this.download('svg', svg, _this.getProcess().name + '.bpmn20.svg')
                })
            },
            // 预览
            handlePreviewXml() {
                this.modeler.saveXML({format: true}, (err, xml) => {
                    this.process.xml = this.replaceLtAndGt(xml)
                    this.xmlVisible = true
                })
            },
            // 清空
            handleClear() {
                this.createNewDiagram()
            },
            // 保存
            handleSave() {
                const _this = this
                this.$refs._bpmnElement?.validate().then(() => {
                    const processId = this.getProcess().id
                    if (!this.idTest.test(processId)) {
                        Message.error('流程标识key格式不正确')
                        return
                    }
                    this.modeler.saveXML({format: true}, (err, xml) => {
                        xml = _this.replaceLtAndGt(xml)
                        const process = _this.getProcess()
                        _this.process.xml = xml
                        _this.modelData.editor = xml
                        _this.modelData.key = process.id
                        _this.modelData.name = process.name
                        _this.modelData.category = process.category

                        _this.$emit("save", _this.modelData);
                    })
                }).catch(e => console.error(e))
            },
            // 复制成功
            onCopy() {
                this.$message.success('内容复制成功')
            },
            // 前进
            handleRedo() {
                this.modeler.get('commandStack').redo()
            },
            // 后退
            handleUndo() {
                this.modeler.get('commandStack').undo()
            },
            // 流程图放大缩小
            handleZoom(radio) {
                const newScale = !radio
                    ? 1.0 // 不输入radio则还原
                    : this.scale + radio <= 0.2 // 最小缩小倍数
                        ? 0.2
                        : this.scale + radio
                this.modeler.get('canvas').zoom(newScale)
                this.scale = newScale
            },
            replaceLtAndGt(xml){
                xml = xml.replace(/&lt;/g, '<')
                xml = xml.replace(/&gt;/g, '>')
                return xml
            }
        }
    }
</script>

<style lang="scss">
    /*左边工具栏以及编辑节点的样式*/
    @import "../../../node_modules/bpmn-js/dist/assets/diagram-js.css";
    @import "../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
    @import "../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
    @import "../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

    $primary-color: #409EFF;
    $primary-background-color: #ecf5ff;

    .view-mode {
        .el-header, .el-aside, .djs-palette {
            display: none;
        }
        .el-loading-mask {
            background-color: initial;
        }
        .el-loading-spinner {
            display: none;
        }
    }

    .fm2-container {
        background: #fff;
        height: calc(100vh - 84px);
        border: 1px solid #e0e0e0;

        .el-container {
            height: 100% !important;
        }

        & > .el-container {
            background: #fff;
        }
        .fm2-main {
            position: relative;
            border-top: solid 1px #e4e7ed;

            & > .el-container {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
        footer {
            height: 30px;
            line-height: 30px;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            text-align: right;
            color: $primary-color;
            background: #fafafa;
            a {
                color: $primary-color;
            }
        }
    }

    .center-container {
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
    }

    .widget-config-container {
        position: relative;
        border-left: solid 1px #e4e7ed;

        .el-form-item__label {
            font-size: 13px;
        }
    }

    .containers {
        background-color: #ffffff;
        width: 100%;
        height: 100%;

        .canvas {
            width: 100%;
            height: 100%;
        }
        .bjs-powered-by {
            display: none;
        }
    }
</style>
