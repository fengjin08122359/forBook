// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import ElementUI from 'element-ui'
import VueWechatTitle from 'vue-wechat-title'
import vueUploadComponent from 'vue-upload-component'
import './style/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'

promise.polyfill()
Vue.use(VueWechatTitle)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>'
})
