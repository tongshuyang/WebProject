import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './global.less'
import outside from './directives/outside'

import * as BRTC from './lib/BRTC'
import * as BRTM from './lib/BRTM'

Vue.directive('outside', outside)
Vue.config.productionTip = false

window.BRTC = BRTC
window.BRTM = BRTM

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
