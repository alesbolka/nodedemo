import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Profile from '../views/Profile'
import Signup from '../views/Signup'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'myprofile',
      path: '/profile',
      component: Profile
    },
    {
      name: 'signup',
      path: '/signup',
      component: Signup
    }
  ]
})
