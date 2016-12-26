<template>
  <form
    class="row"
    @submit.prevent="onSubmit"
  >
    <div class="col-xs-12 col-sm-6">
      <label for="reg-username">Username:</label>
      <input
        id="reg-username"
        class="form-control"
        type="text"
        v-model="username"
        @keyup="keyUp"
      >
    </div>
    <div class="col-xs-12 col-sm-6">
      <label for="reg-email">Email:</label>
      <input
        id="reg-email"
        class="form-control"
        type="text"
        v-model="email"
      >
    </div>
    <div class="col-xs-12 col-sm-6">
      <label for="reg-username">Password:</label>
      <input
        id="reg-pw"
        class="form-control"
        type="password"
        v-model="pw"
      >
    </div>
    <div class="col-xs-12 col-sm-6">
      <label for="reg-username">Repeat the password:</label>
      <input
        id="reg-pw2"
        class="form-control"
        type="password"
        v-model="pw2"
      >
    </div>
    <div class="col-xs-12 col-sm-6">
      <date-picker
        v-model="birthdate"
      ></date-picker>
    </div>
    <div class="col-xs-12 text-center">
      <button
        class="btn btn-primary"
        type="submit"
        :disabled="!formValid"
      >Create a new user</button>
    </div>
  </form>
</template>

<script>
  import debounce from '../global/debounce';
  import DatePicker from '../components/DatePicker'

  export default {
    components: {
      DatePicker
    },
    computed: {
      formValid () {
        return this.validBD
          && this.validEmail
          && this.validUsername
          && this.validPw;
      },
      validBD () {
        let result = true;
        try {
          let date = new Date(this.birthdate);
          result = !isNaN(date.getTime()) && this.birthdate.split('-')[0] !== '0';
        } catch (e) {
          result = false;
        }

        return result;
      },
      validEmail () {
        return this.email.length;
      },
      validUsername () {
        return this.username.length;
      },
      validPw () {
        return this.pw.length
          && this.pw === this.pw2;
      }
    },
    data () {
      return {
        birthdate: '',
        email: '',
        pw: '',
        pw2: '',
        username: '',
        usernameTaken: 0
      };
    },
    methods: {
      dateChange: function (a,b) {
        console.log(a,b);
      },
      keyUp: debounce(function () {
        if (!this.username.trim()) {
          this.usernameTaken = 0;
          return;
        }
        // this.$http.get('/api/username', )
      }, 700),
      onSubmit () {
        console.log('form submitted');
        if (!this.formValid) {
          return;
        }
        this.$http.post('/api/user', {
          username: this.username,
          password: this.pw,
          password_repeat: this.pw2,
          birthdate: this.birthdate,
          email: this.email
        }).then(
          (rsp) => {
            console.log(rsp);
          },
          (err) => {
            console.log(err);
          }
        )
      }
    }
  }
</script>