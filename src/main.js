import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './style/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import router from './permission'
import axios from './utils/axios.config.js'
import Component from './components'

Vue.use(Component)
// axios.defaults.baseURL = 'http://localhost:3031'
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
