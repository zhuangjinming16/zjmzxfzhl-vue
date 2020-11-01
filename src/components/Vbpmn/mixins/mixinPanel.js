import showConfig from './showConfig'

export default {
    props: {
        modeler: {
            type: Object,
            required: true
        },
        element: {
            type: Object,
            required: true
        },
        descriptor: {
            type: String,
            default: 'flowable'
        }
    },
    watch: {
        'formData.id': function (val) {
            this.updateProperty('id', val)
        },
        'formData.name': function (val) {
            this.updateProperty('name', val)
        }
    },
    methods: {
        updateProperties(properties) {
            const modeling = this.modeler.get('modeling')
            modeling.updateProperties(this.element, properties)
        },
        updateProperty(propertyName, val, hasDescriptor) {
            if (val === '') {
                val = null
            }
            let properties = {}
            if (hasDescriptor) {
                propertyName = this.descriptorPrefix + propertyName
            }
            properties[propertyName] = val
            const modeling = this.modeler.get('modeling')
            modeling.updateProperties(this.element, properties)
        },
        convertDescriptorProperties(data){
            // 移除 flowable: 或 camunda: 等前缀开头的变量，格式化数组
            for (const key in data) {
                if (key.indexOf(this.descriptorPrefix) === 0) {
                    const newKey = key.replace(this.descriptorPrefix, '')
                    data[newKey] = data[key]
                    delete data[key]
                }
            }
            return data
        },
        validate() {
            return this.$refs?.refForm.validate()
        }
    },
    computed: {
        descriptorPrefix() {
            return this.descriptor + ':'
        },
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
