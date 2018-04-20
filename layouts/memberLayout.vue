<template>
  <div>
    <Navbar scheme="dark" />
    <nuxt/>
    <h1 class="display-4">Alternate Layout</h1>
  </div>
</template>

<script>

  import Navbar from '~/components/navbar.vue'

  export default{
    components: {
      Navbar
    }
  }
</script>

<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
