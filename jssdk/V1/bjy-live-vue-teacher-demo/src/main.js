import Vue from 'vue'
import App from './App.vue'

import Dialog from './components/common/Dialog/dialog.js'
import Toast from './components/common/Toast/toast.js'

Vue.use(Dialog)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
