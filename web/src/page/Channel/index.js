import Channel from './Channel'

Channel.install = function (Vue) {
  Vue.component(Channel.name, Channel)
}

export default Channel
