<template>
  <div id="master">
    <div id="master-header">
      <a id="logo" href="#/">
        NodeJS Demo Auth app
      </a>
      <span id="logbtn" v-show="this.$store.getters.authStatus">
        <div
          class="btn btn-primary pull-right"
          @click="logout"
        >
          Logout
        </div>
      </span>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
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
    height: 40px;
    background-color: #1F3522;
    padding: 0 12px;
    color: #fff;
    line-height: 40px;
  }

  #logo {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  #logbtn > .btn {
    margin-top: 3px;
  }

  .btn-success {
    background-color: #1F3522;
    border-color: #1F3522;
  }
</style>
