<template>
  <div id="master">
    <div id="master-header">
      <a href="#/">
        Demo app
      </a>
      <span v-show="showAuth">
        <a
          class="btn btn-primary pull-right"
          href="#/login"
          v-if="!this.$store.getters.authStatus"
        >
          Login
        </a>
        <div
          class="btn btn-primary pull-right"
          @click="logout"
          v-else
        >
          Logout
        </div>
      </span>
    </div>
  <!-- this.$store.getters.authStatus -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      showAuth () {
        return this.$route.name !== 'login';
      }
    },
    methods: {
      logout() {
        this.$http.get('/api/auth/logout').then(
          (rsp) => {
            this.$store.commit('Logout');
            this.$router.push('/');
          },
          (err) => {
            this.$store.commit('Logout');
            this.$router.push('/');
            // window.location.href="/";
          }
        );
      }
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    height: 100%;
  }

  #master {
    min-height: 100%;
    margin-bottom: -25px;
  }

  #master:after {
    content: "This is a demo app made for a tech challenge of a job interview.";
    opacity: 0;
    display: block;
  }

  #master-footer,
  #master:after {
    text-align: center;
    line-height: 25px;
    height: 25px;
  }

  #master-header {
    height: 30px;
    background-color: #1F3522;
    color: #fff;
  }
</style>
