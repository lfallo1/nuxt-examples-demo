<template>
  <section class="container">
    <div>
      <h1 class="title">
        VP Reports UI
      </h1>
      <div class="row" v-if="auth">
        <div class="align-center col-xs-12">
          <b-btn v-if="!refreshing" variant="outline-success" @click="refreshPrograms()">Refresh Programs</b-btn>
          <b-btn v-else :disabled="true" variant="outline-success">Refreshing Programs</b-btn>
        </div>
      </div>
      <b-button variant="outline-primary" v-if="auth" @click="$router.push('/member')">Dashboard</b-button>
      <b-button variant="outline-warning" @click="$router.push('/about')">About</b-button>
      <b-button variant="outline-primary" v-if="!auth" @click="$router.push('/login')">Login</b-button>
      <b-button variant="outline-danger" v-if="auth" @click="logout">Logout</b-button>
    </div>

  </section>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {

    computed: {
      ...mapState({
        refreshing: state => state.reports.refreshing,
        auth: state => state.auth
      })
    },
    methods: {
      ...mapActions({refreshPrograms: 'reports/refreshPrograms', logout: 'logout'}),
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .align-center {
    margin: 0px auto;
    margin-top: 10px !important;
  }

</style>
