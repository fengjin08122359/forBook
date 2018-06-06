import Repository from './Repository'

Repository.install = function (Vue) {
  Vue.component(Repository.name, Repository)
}

export default Repository
