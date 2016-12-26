import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Dirty
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

const state = (()=>{
  let token = getCookie('argTk');
  let exp = new Date(getCookie('argEx'));
  if (isNaN(exp)) {
    exp = undefined;
  }

  return {
    count: 0,
    profile: undefined,
    expiry: exp,
    accCreated: false,
    token: token || ''
  };
})();

const mutations = (() => {
  return {
    LoadToken(state) {
      if (state.token) {
        Vue.http.headers.common['Authorization'] = state.token;
      }
    },
    Logout(state) {
      delete Vue.http.headers.common['Authorization'];
      state.token = '';
      state.expiry = new Date();
      state.expiry.setSeconds(state.expiry.getSeconds() - 10);

      document.cookie = 'argTk=i;expires=' + new Date('2000-01-01');
      document.cookie = 'argEx=0;expires=' + new Date('2000-01-01');;
    },
    NewToken(state, payload) {
      Vue.http.headers.common['Authorization'] = payload.token;
      state.token = payload.token;
      state.expiry = new Date(payload.expiry);

      document.cookie = 'argTk=' + payload.token + ';expires=' + state.expiry;
      document.cookie = 'argEx=' + state.expiry + ';expires=' + state.expiry;
    },
    AccCreated(state) {
      state.accCreated = true;
    },
    RemoveAccCrFlag(state) {
      state.accCreated = false;
    }
  }
})();

const actions = {
  Bootup() {

  }
};

const getters = (() => {
  return {
    authStatus: state => {
      return state.token !== '' && state.expiry > new Date();
    }
  }
})();

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

console.log('bootup token:', state.token);
console.log('bootup expiry:', state.expiry);

export default store
