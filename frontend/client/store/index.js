import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  token: '',
  expiry: new Date()
}

const mutations = (() => {
  return {
    Logout(state) {
      delete Vue.http.headers.common['Authorization'];
      state.token = '';
      state.expiry = new Date();
      state.expiry.setSeconds(state.expiry.getSeconds() - 10);
    },
    NewToken(state, payload) {
      Vue.http.headers.common['Authorization'] = payload.token;
      state.token = payload.token;
      state.expiry = new Date(payload.expiry);
    },
    INCREMENT(state) {
      state.count++
    },
    DECREMENT(state) {
      state.count--
    }
  }
})()

const actions = {
  incrementAsync({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const getters = (() => {
  return {
    authStatus: state => {
      return state.token !== '' && state.expiry > new Date();
    }
  }
})()

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
