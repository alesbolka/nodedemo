<template>
  <div id="login-container" class="page">
    <form
      class="row"
      @submit.prevent="authAttempt"
    >
      <div class="col-xs-12">
        <label for="username">
          Username:
        </label>
        <input
          id="username"
          class="form-control"
          type="text"
          v-model="username"
        >
      </div>
      <div class="col-xs-12 mt-5">
        <label for="password">
          Password:
        </label>
        <input
          id="password"
          class="form-control"
          type="password"
          v-model="password"
        >
      </div>
      <div class="col-xs-12 mt-5" v-show="newAcc || authError.length">
        <div class="alert alert-success" style="margin-bottom: 0" v-show="newAcc">
          Your account has been created, you can now log in.
        </div>
        <error class="text-center" v-show="authError.length">
          {{authError}}
        </error>
      </div>
      <div class="col-xs-12 mt-5 text-center">
        <button
          class="btn btn-primary"
          type="submit"
        >
          Sign in
        </button>

        <router-link
          class="btn btn-success"
          type="submit"
          to="signup"
        >
          Sign up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>

import Error from '../components/Error';

export default {
  components: {
    Error
  },
  data() {
    let newAcc = this.$store.state.accCreated;
    this.$store.commit('RemoveAccCrFlag');
    return {
      username: 'randomjohn',
      password: 'test211',
      newAcc: newAcc,
      authError: ''
    }
  },
  methods: {
    authAttempt: function(e) {
      this.authError = '';
      this.$http.post('/api/auth', {
        username: this.username,
        password: this.password
      }).then(
        (rsp) => { // Success
          this.$store.commit('NewToken', {
            token: rsp.body.token,
            expiry: rsp.body.expiry,
            profile: rsp.body.profile
          });
          this.$router.push('/');
        },
        (rsp) => { // Fail
          if (rsp.status === 422) {
            return this.authError = 'Username and password do not match';
          }
          this.authError = 'The server is not accessible at the moment, please try again later';
          console.error(rsp);
        }
      );
    }
  }
}
</script>

<style type="login-container">
  #login-container {
    max-width: 400px;
    margin: 80px auto 0;
  }

  .mt-5 {
    margin-top: 20px;
  }
</style>