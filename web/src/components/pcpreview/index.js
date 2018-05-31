import pcpreview from './pcpreview'

/* istanbul ignore next */
pcpreview.install = function (Vue) {
  Vue.component(pcpreview.name, pcpreview)
}

export default pcpreview
