<template>
  <section class="container">
    <div class="user-container">
      <img :src="`https://robohash.org/${guestUser.id}?set=set4&size=300x300`" :alt="`${guestUser.name}'s avatar`">
      <form @submit.prevent="makeMessage" style="margin: 2rem 0 1rem 0;">
        <input class="field w-500 dib" type="text" v-model="text" placeholder="Write your message here and press <Enter>">
        <input class="field w-500 dib" type="text" v-model="writeNote" placeholder="Write a note here and press <Enter>">
        <button type="submit">Sabmit</button>
      </form>
      <h1 style="margin: 1rem 0; font-size: 50px;">{{ guestUser.name }}</h1>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      guestUser: this.$store.state.users.find(usr => parseInt(usr.id) === parseInt(this.$route.params.id)),
      guestUsersNotes: [],
      writeNote: "",
      text: "",
      messages: []
    }
  },
  methods: {
    async makeMessage() {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      const body = JSON.stringify({
        text: this.text,
        note: this.writeNote,
        toUser: this.guestUser.id,
        fromUser: this.$store.getters.initUser,
        status: "received"
      })

      const res = await this.$axios.post(`http://localhost:4500/messages`, body, config)
      await this.messages.push(res.data)
      this.writeNote = ""
      this.text = ""
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