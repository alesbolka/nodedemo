<template>
  <component :is="useComponent"></component>
</template>

<script>
import Profile from 'views/Profile';
import Login from 'views/Login';

export default {
  components: {
    Profile,
    Login
  },
  computed: {
    useComponent () {
      if (this.$store.getters.authStatus) {
        return 'Profile';
      }
      return 'Login';
    },
    username () {
      return this.$store.state.profile.username;
    }
  }
}
</script>
