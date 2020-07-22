import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

Vue.config.productionTip = false

const axiosInstance = axios.create({
  headers: {
      Authorization: 'Bearer '+ sessionStorage.getItem('jwt'),
      'Content-Type': 'application/json'
  }
});  
Vue.prototype.axios = axiosInstance

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
