import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Profile from '../views/Profile'
import Signup from '../views/Signup'
import objGet from '../global/objGet'
import store from '../store'

Vue.use(Router)

const router = new Router({
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
      meta: {
        requiresAuth: false
      },
      component: Login
    },
    {
      name: 'myprofile',
      path: '/profile',
      meta: {
        requiresAuth: true
      },
      component: Profile
    },
    {
      name: 'signup',
      path: '/signup',
      meta: {
        requiresAuth: false
      },
      component: Signup
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  let required = objGet(to, 'meta.requiresAuth');
  let status = store.getters.authStatus;

  if (!status && required) {
    // Auth required, not authenticated, redirect to login
    return next('login');
  } else if (required !== undefined && required !== status) {
    // Prevent when the status does not match requirement exactly
    return next(false);
  }

  next();
});

export default router;