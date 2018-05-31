import h5preview from './h5preview'

/* istanbul ignore next */
h5preview.install = function (Vue) {
  Vue.component(h5preview.name, h5preview)
}

export default h5preview
