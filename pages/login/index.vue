<template>
  <div>
    <b-form @submit.prevent="submit">
      <b-form-group id="exampleInputGroup1"
                    label="Username:"
                    label-for="exampleInput1"
                    description="Enter your username">
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="username"
                      placeholder="Username">
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
      <b-button :disabled="loading" type="submit" variant="primary">Login</b-button>
      <h6 variant="muted" v-if="loading">Loading please wait...</h6>
    </b-form>
  </div>
</template>

<script>

  import {mapActions, mapState} from 'vuex'
  import axios from 'axios'

  export default {
    data(){
      return {
        username: '',
        password: ''
      }
    },
    computed:{
      ...mapState(['loading'])
    },
    methods: {
      ...mapActions(['setAuth', 'login']),
      submit(){
        this.login({username: this.username, password: this.password});
      }
    },
    middleware: ['noAuth']
  }
</script>
