// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import api from './api'
import store from './store'
import type from './enum'
import {backgroundMatrix, bulletMatrix, tankMatrix} from './matrix'
import './style/normalize.css'

promise.polyfill()
Vue.prototype.$api = api
Vue.prototype.$type = type
Vue.use(backgroundMatrix)
Vue.use(bulletMatrix)
Vue.use(tankMatrix)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  template: '<App/>'
})
