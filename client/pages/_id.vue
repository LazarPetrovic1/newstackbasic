<template>
  <section class="container">
    <div class="user-container">
      <img :src="`https://robohash.org/${guestUser.id}?set=set4&size=300x300`" :alt="`${guestUser.name}'s avatar`">
      <form @submit.prevent="makeMessage" style="margin: 2rem 0 1rem 0;">
        <input class="field w-500 dib no-bot" type="text" v-model="text" placeholder="Write your message here and press <Enter>">
        <input class="field w-500 dib no-top" type="text" v-model="writeNote" placeholder="Write a note here and press <Enter>">
        <button type="submit" class="sub">
          <fa-icon :icon="['fas', 'paper-plane']" /> Submit
        </button>
      </form>
      <h1 style="margin: 1rem 0; font-size: 50px;">{{ guestUser.name }}</h1>
      <div v-if="messages.length > 0" class="message-holder">
        <Message :updateMessage="updateMessage" :removeItem="removeItem" v-for="msg in messages" :key="msg.id" :message="msg" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Message from "../components/Message.vue"

export default {
  props: {
    Message
  },
  data() {
    return {
      guestUser: this.$store.state.users.find(usr => parseInt(usr.id) === parseInt(this.$route.params.id)),
      writeNote: "",
      text: "",
      messages: [],
      error: ""
    }
  },
  async mounted() {
    const res = await this.$axios.get(`http://localhost:4500/messages/to/${this.$route.params.id}`)
    console.log("MAUNTID", res.data);
    this.messages = await res.data
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
        toUser: this.$route.params.id,
        fromUser: this.$store.getters.initUser.id,
        status: "received"
      })

      const res = await this.$axios.post(`http://localhost:4500/messages`, body, config)
      await this.messages.push(res.data)
      this.writeNote = ""
      this.text = ""
    },
    async removeItem(id) {
      try {
        await this.$axios.delete(`http://localhost:4500/messages/${id}`)
        this.messages = await this.messages.filter(msg => parseInt(msg.id) !== parseInt(id))
      } catch(e) {
        this.error = e.message
      }
    },
    async updateMessage(id, msg) {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      const body = JSON.stringify(msg)
      const res = await this.$axios.put(`http://localhost:4500/messages/${id}`, body, config)
      console.log("REZ TACKA DEJTA", res.data);
      const newMessages = await this.messages.filter(msg => parseInt(msg.id) !== parseInt(id)) 
      console.log("NJUMESIDZIZ", newMessages);
      this.messages = [res.data, ...newMessages]
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

.no-bot { border-bottom: none; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.no-top { border-top: none; border-top-left-radius: 0; border-top-right-radius: 0; }

.sub {
  padding: 0.5rem 0;
  display: block;
  width: 100%;
  border: 1px solid white;
  cursor: pointer;
  outline: none;
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: bolder;
  border-radius: 1rem;
  color: white;
  background: transparent;
}

.message-holder {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
</style>