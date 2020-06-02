import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import './core/use'
import bootstrap from './core/bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
