import ncselectTree from './ncselectTree'

/* istanbul ignore next */
ncselectTree.install = function (Vue) {
  Vue.component(ncselectTree.name, ncselectTree)
}

export default ncselectTree
