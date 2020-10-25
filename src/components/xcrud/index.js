import xForm from './xForm/'
import xTable from './xTable/'
import golbalConfig from './common/config'
const components = [
  xForm,
  xTable
]

function install(Vue, opts = {}) {
  golbalConfig.set(opts)
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  xForm,
  xTable
}
