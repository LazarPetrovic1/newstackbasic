<template>
  <div>
    <Navbar/>
    <nuxt />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
export default {
  components: {
    Navbar
  }
}
</script>

<style>
  .pointer {
    cursor: pointer;
  }

  .normalize-links {
    color: white;
    text-decoration: none;
  }
</style>