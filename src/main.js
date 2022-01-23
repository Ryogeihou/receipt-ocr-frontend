import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCropper from 'vue-cropper'

Vue.config.productionTip = false

Vue.use(VueCropper)



import axios from 'axios'
import './plugins/element.js'

// axios.defaults.baseURL = 'http://127.0.0.1:8888/'
// axios.defaults.baseURL = process.env.BASE_API;


Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
