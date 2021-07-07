<template>
  <section class="container">
    <div class="user-container">
      <img :src="`https://robohash.org/${guestUser.id}?set=set4&size=300x300`" :alt="`${guestUser.name}'s avatar`">
      <h1 style="margin: 1rem 0; font-size: 50px;">{{ guestUser.name }}</h1>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      guestUser: this.$store.state.users.find(usr => parseInt(usr.id) === parseInt(this.$route.params.id))
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      storeUser: "storeUser",
      initUser: "initUser",
      initUsers: "initUsers"
    })
  },
  head() {
    return {
      title: `Basic App | Account of ${this.$store.state.users.find(usr => parseInt(usr.id) === parseInt(this.$route.params.id)).name}`,
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: `This is the homepage of the guest user`
        }
      ]
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding-top: 1rem;
}

.user-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-container > img {
  width: 300px;
  height: 300px;
}
</style>