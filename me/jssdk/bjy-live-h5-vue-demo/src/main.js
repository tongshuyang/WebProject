import App from './App.vue'
import Toast from './components/Toast/toast.js'

/**
 * 我们对Vue的底层代码进行了一些改动，使其可以更好的兼容我们的组件
 */
const Vue = Yox.Vue
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
