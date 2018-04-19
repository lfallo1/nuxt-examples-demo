<template>
  <div>
    <b-form @submit.prevent="login">
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="exampleInput1"
                    description="Enter your email address">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="username"
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Password"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="password"
                      v-model="password"
                      placeholder="Password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>

  import {mapActions} from 'vuex'

  export default {
    data(){
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions(['setAuth']),
      login(){
        if(this.username && this.password){
          this.setAuth({username: this.username, loginTime: new Date()}).then( () => {
            this.$toasted.success('You have been logged in', {icon: 'check_circle'}).goAway(3500);
          });
          this.$router.push('/member');
          return;
        }
        this.$toasted.error('Invalid username / password', { icon: 'warning' }).goAway(3500);
      }
    },
    middleware: ['noAuth']
  }
</script>
