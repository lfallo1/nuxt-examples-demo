<template>
  <section class="container">
    <h3 class="title">Dashboard ({{auth.user_details.username}})</h3>
    <nuxt-link to="/">Home</nuxt-link>
  </section>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['auth'])
    },
    middleware: ['auth']
  }
</script>
