import backcol from './backcol'

/* istanbul ignore next */
backcol.install = function (Vue) {
  Vue.component(backcol.name, backcol)
}

export default backcol
