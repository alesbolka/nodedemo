import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import App from './components/App'
import router from './router'
import store from './store'
import authCheck from './interceptors/auth'

Vue.use(VueCookie)
Vue.use(VueResource)

Vue.http.interceptors.push(authCheck)

const app = new Vue({
  router,
  store,
  ...App
})

export {app, router, store}
