<template>
  <div>
    <b-card :title="'' + error.statusCode"
            :sub-title="error.message">
      <nuxt-link class="card-link" to="/">Home</nuxt-link>
    </b-card>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>
