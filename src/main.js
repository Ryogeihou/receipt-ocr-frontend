import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false




import axios from 'axios'
import './plugins/element.js'

axios.defaults.baseURL = 'http://127.0.0.1:8888/'

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
