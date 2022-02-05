import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCropper from 'vue-cropper'

Vue.config.productionTip = false
Vue.use(VueCropper)//アップロード画像をドミング用プログイン

// http発信用プラグイン
import axios from 'axios'
// element-UIのセッティング
import './plugins/element.js'

Vue.prototype.$http = axios

// 時間ステップ/時間フォマット
Vue.filter ('dataFormat', function (originVal) {
  originVal = originVal - 0
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
