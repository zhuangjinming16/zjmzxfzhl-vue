import xTable from './src/xTable'

xTable.install = function(Vue) {
  Vue.component(xTable.name, xTable)
}

export default xTable
