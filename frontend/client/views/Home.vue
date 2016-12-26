<template>
  <div v-if="this.$store.getters.authStatus">
    Welcome {{ username }}, you can view your profile <router-link to="profile">here</router-link>.
  </div>
  <div class="mt-5 clearfix" v-else>
    <p class="text-center mt-5">
      Welcome to the demo app, please <router-link to="login">log in</router-link> to see your user profile.
    </p>
  </div>
</template>

<script>
import Profile from 'views/Profile';

export default {
  components: {
    Profile
  },
  computed: {
    useComponent () {
      return 'Counter2';
    },
    username () {
      return this.$store.state.profile.username;
    }
  }
}
</script>
