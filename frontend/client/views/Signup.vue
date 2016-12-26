<template>
  <form
    class="signup-container form-horizontal mt-5"
    @submit.prevent="onSubmit"
  >
    <div class="form-group">
      <label class="col-sm-3 col-lg-2 control-label" for="reg-username">Username:</label>
      <div class="col-sm-9 col-lg-10">
        <input
          id="reg-username"
          class="form-control"
          type="text"
          v-model="username"
          @keyup="keyUp"
        >
      </div>
      <div
        class="col-xs-12 col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2"
        v-show="errors.username.length"
      >
        <error>
          <p v-for="error in errors.username">{{error}}</p>
        </error>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-lg-2 control-label" for="reg-email">Email:</label>
      <div class="col-sm-9 col-lg-10">
        <input
          id="reg-email"
          class="form-control"
          type="text"
          v-model="email"
        >
      </div>
      <div
        class="col-xs-12 col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2"
        v-show="errors.email.length"
      >
        <error>
          <p v-for="error in errors.email">{{error}}</p>
        </error>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-lg-2 control-label" for="reg-pw">Password:</label>
      <div class="col-sm-9 col-lg-10">
        <input
          id="reg-pw"
          class="form-control"
          type="password"
          v-model="pw"
        >
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-3 col-lg-2" for="reg-pw2">Repeat the password:</label>
      <div class="col-sm-9 col-lg-10">
        <input
          id="reg-pw2"
          class="form-control has-error"
          type="password"
          v-model="pw2"
        >
      </div>
      <div
        class="col-xs-12 col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2"
        v-show="errors.password.length"
      >
        <error>
          <p v-for="error in errors.password">{{error}}</p>
        </error>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-lg-2 control-label">Birthdate:</label>
      <div class="col-sm-9 col-lg-10">
        <date-picker v-model="birthdate"></date-picker>
      </div>
      <div
        class="col-xs-12 col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2"
        v-show="errors.birthdate.length"
      >
        <error>
          <p v-for="error in errors.birthdate">{{error}}</p>
        </error>
      </div>
    </div>
    <div class="col-xs-12 mt-3 text-center">
      <button
        class="btn btn-primary"
        type="submit"
      >Create a new user</button>
    </div>
  </form>
</template>

<script>
  import debounce from '../global/debounce';
  import objGet from '../global/objGet';
  import DatePicker from '../components/DatePicker'
  import Error from '../components/Error';

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  export default {
    components: {
      Error,
      DatePicker
    },
    computed: {

    },
    data () {
      return {
        birthdate: '',
        email: '',
        pw: '',
        pw2: '',
        username: '',
        usernameTaken: 0,
        errors: {
          birthdate: [],
          email: [],
          password: [],
          username: []
        }
      };
    },
    methods: {
      keyUp: debounce(function () {
        if (!this.username.trim()) {
          this.usernameTaken = 0;
          return;
        }
        // this.$http.get('/api/username', )
      }, 700),
      fullValidate () {
        let username = this.validUsername(),
          email = this.validEmail(),
          pw = this.validPw(),
          bd = this.validBD();
        return username
          && email
          && pw
          && bd;
      },
      onSubmit () {
        if (!this.fullValidate()) {
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
            this.$store.commit('AccCreated');
            this.$router.push('login');
          },
          (err) => {
            if (objGet(err, 'body.code', 0) === 1) {
              this.errors.username = ['This username is not available'];
              return;
            }
            this.fullValidate();
          }
        )
      },
      showErrors(err) {
        console.log(err);
      },
      validBD () {
        let result = true;
        this.errors.birthdate = [];
        try {
          let date = new Date(this.birthdate);
          result = !isNaN(date.getTime()) && this.birthdate.split('-')[0] !== '0';
        } catch (e) {
          result = false;
        }
        if (!result) {
          this.errors.birthdate = ['Birthdate is required.'];
        }

        return result;
      },
      validEmail () {
        this.errors.email = [];
        if (!this.email.length) {
          this.errors.email = ['Email is required'];
          return false;
        }

        if (!validateEmail(this.email)) {
          this.errors.email = ['Invalid email'];
          return false;
        }

        return true;
      },
      validUsername () {
        this.errors.username = [];
        if (!this.username.length) {
          this.errors.username = ['Username is required'];
          return false;
        }
        return true;
      },
      validPw () {
        this.errors.password = [];
        if (this.pw.length < 6) {
          this.errors.password = ['Password must be at least 6 characters long'];
        }

        if (this.pw !== this.pw2) {
          this.errors.password.push('Passwords do not match');
          return false;
        }

        return true;
      }
    }
  }
</script>

<style type="text/css">
  .mt-3 {
    margin-top: 12px;
  }
</style>