import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

new Vue({
  vuetify,
  router,
  store,
  beforeCreate() {this.$store.commit('initialiseStore');},
  render: h => h(App)
}).$mount('#app')
