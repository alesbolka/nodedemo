<template>
  <div>
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
</template>

<script>
  export default {
    computed: {
      profile: function () {
        return this.$store.state.profile;
      }
    }
  }
</script>