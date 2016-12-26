<template>
  <div v-if="profile">
    <h4>Profile of {{profile.username}}</h4>
    <div class="row">
      <b class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
        Birthdate
      </b>
      <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
        {{ profile.birthdate.toLocaleDateString() }}
      </div>
      <b class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
        Email
      </b>
      <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
        {{ profile.email }}
      </div>
    </div>
  </div>
  <div v-else>
    {{emptyMsg}}
  </div>
</template>

<script>
  export default {
    computed: {
      profile: function () {
        return this.$store.state.profile;
      }
    },
    data () {
      return {
        emptyMsg: 'Loading...'
      };
    },
    mounted() {
      if (this.profile) {
        return;
      }
      this.$http.get('/api/user').then(
        (rsp) => {
          this.$store.commit('SaveProfile', rsp.body);
        },
        (err) => {
          this.emptyMsg = 'This service is unavailable at the moment';
        }
      );
    }
  }
</script>