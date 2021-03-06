import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import App from './components/App'
import router from './router'
import store from './store'

Vue.use(VueCookie)
Vue.use(VueResource)
sync(store, router);

const app = new Vue({
  router,
  store,
  ...App,
  created () {
    this.$store.commit('LoadToken');
  }
})

export {app, router, store}
