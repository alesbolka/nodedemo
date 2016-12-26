import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  expiry: new Date(),
  profile: {},
  accCreated: false,
  token: ''
}

const mutations = (() => {
  return {
    Logout(state) {
      delete Vue.http.headers.common['Authorization'];
      state.token = '';
      state.profile = {};
      state.expiry = new Date();
      state.expiry.setSeconds(state.expiry.getSeconds() - 10);
    },
    NewToken(state, payload) {
      Vue.http.headers.common['Authorization'] = payload.token;
      state.profile = payload.profile || {};
      state.profile.birthdate = new Date(state.profile.birthdate);
      state.token = payload.token;
      state.expiry = new Date(payload.expiry);
    },
    AccCreated(state) {
      state.accCreated = true;
    },
    RemoveAccCrFlag(state) {
      state.accCreated = false;
    }
  }
})()

const actions = {
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
