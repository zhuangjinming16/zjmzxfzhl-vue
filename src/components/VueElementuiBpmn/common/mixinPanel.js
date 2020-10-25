import xcrud from "@/components/xcrud";
import golbalConfig from '@/components/xcrud/common/config'
import showConfig from './showConfig'
import Cookies from "js-cookie";

let size = Cookies.get('size') || 'mini';
golbalConfig.set({
    input: {
        size
    },
    select: {
        size
    },
    colorPicker: {
        showAlpha: true
    },
    operate: {
        btn: {
            size
        }
    },
    xform: {
        form: {
            size,
            tabs: {
                table: {
                    size,
                    addConfig: {
                        size
                    }
                }
            }
        }
    },
    xtable:{
        table: {
            size
        }
    }
})
export default {
    components: {xForm: xcrud.xForm},
    props: {
        modeler: {
            type: Object,
            required: true
        },
        element: {
            type: Object,
            required: true
        }
    },
    watch: {
        'formData.id': function (val) {
            this.updateProperties({id: val})
        },
        'formData.name': function (val) {
            this.updateProperties({name: val})
        },
        'formData.color': function (val) {
            this.setColor({fill: val, stroke: val})
            this.updateProperties({color: val})
        }
    },
    methods: {
        updateProperties(properties) {
            const modeling = this.modeler.get('modeling')
            modeling.updateProperties(this.element, properties)
        },
        setColor(properties) {
            const modeling = this.modeler.get('modeling')
            modeling.setColor(this.element, properties)
        },
        validate(){
            return this.$refs?.xForm.validate()
        }
    },
    computed: {
        elementType() {
            const bizObj = this.element.businessObject
            return bizObj.eventDefinitions
                ? bizObj.eventDefinitions[0].$type
                : bizObj.$type
        },
        showConfig() {
            return showConfig[this.elementType] || {}
        }
    }
}
