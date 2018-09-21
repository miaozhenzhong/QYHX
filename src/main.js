// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// import 'babel-polyfill'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icons', Icon)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import {formPost, jsonPost, Get, fileGet, Bus} from './plugins/axios'
Vue.prototype.$formPost = formPost
Vue.prototype.$jsonPost = jsonPost
Vue.prototype.$Get = Get
Vue.prototype.$fileGet = fileGet
Vue.prototype.$bus = Bus
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
