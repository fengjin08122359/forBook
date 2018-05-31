import backgroundMatrix from './backgroundMatrix'
import bulletMatrix from './bulletMatrix'
import tankMatrix from './tankMatrix'

backgroundMatrix.install = function (Vue) {
  Vue.component(backgroundMatrix.name, backgroundMatrix)
}
bulletMatrix.install = function (Vue) {
  Vue.component(bulletMatrix.name, bulletMatrix)
}
tankMatrix.install = function (Vue) {
  Vue.component(tankMatrix.name, tankMatrix)
}

export {
  backgroundMatrix,
  bulletMatrix,
  tankMatrix
}
