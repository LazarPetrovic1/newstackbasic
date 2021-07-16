<template>
  <section>
    <div v-if="userState && userState.name && userState.email && userState.password">
      <p>Name: <UpdateField @user-changed="updateUser" :id="userState.id" :user="userState" itemName="name" :item="userState.name" /></p>
      <p>E-Mail: <UpdateField @user-changed="updateUser" :id="userState.id" :user="userState" itemName="email" :item="userState.email" /></p>
      <p>
        <span>Change password: </span>
        <input
          style="display: inline-block; margin-bottom: 1rem; padding: 0.5rem 1rem;"
          type="password"
          :placeholder="userState.password"
          v-model="password"
        >
        <button @click="changeUser(userState.id, user)" class="fs-24 p-1 pointer">
          <fa-icon :icon="['fas', 'check-double']" />
        </button>
      </p>
    </div>
    <div v-else>
      <h2>Nothing happened</h2>
    </div>
    <div v-if="messages.length > 0 && userState" class="message-holder">
      <Message :isTheirs="parseInt(userState.id) === parseInt(msg.toUser)" @changeStatus="changeStatus" :removeItem="removeItem" :updateMessage="updateMessage" v-for="msg in messages" :key="msg.id" :message="msg" />
    </div>
    <div v-if="allUsers.length > 0">
      <UserCard v-for="person in allUsers" :user="person" :key="person.id" />
    </div>
    <div v-if="allItems && allItems.length > 0" class="items-container">
      <article v-for="(item, i) in allItems" :key="item.id">
        <Item
          :item="item"
          :src="sources[i]"
          @likeDislikeEvent="updateItems"
        />
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import UpdateField from "../components/UpdateField.vue"
import UserCard from "../components/UserCard.vue"
import Item from "../components/Item.vue"
import Message from "../components/Message.vue"
import { mapGetters } from 'vuex'

export default {
  name: "Home",
  components: {
    UpdateField,
    UserCard,
    Item
  },
  // PROPS,
  props: {
    Message
  },
  head() {
    return {
      title: "Basic App | Homepage",
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: "This is the homepage of the user"
        }
      ]
    }
  },
  data() {
    const data: {
      userState: string | null,
      password: string,
      allUsers: any[],
      sources: string[],
      allItems: any[],
      messages: any[]
    } = {
      userState: null,
      password: '',
      allUsers: [],
      sources: [],
      allItems: [],
      messages: []
    }
    return data
  },
  computed: {
    ...mapGetters({
      storeUser: "storeUser",
      initUser: "initUser",
      initUsers: "initUsers",
      initItems: "items/initItems"
    })
  },
  async mounted() {
    if (!localStorage.getItem('token') && !JSON.parse(localStorage.getItem('id'))) {
      this.$router.push("/login")
      return;
    }
    const resp = await this.$axios.get(`http://localhost:4500/messages/to/${JSON.parse(localStorage.getItem('id'))}`)
    console.log("REZP TACKA DEJTA", resp.data);
    
    this.messages = await resp.data
    await this.$store.dispatch('populateUsers');
    await this.$store.dispatch("items/getAllItems")
    await this.$store.dispatch('getUser', JSON.parse(localStorage.getItem('id')));
    
    this.userState = await this.$store.getters.initUser
    this.allItems = await this.$store.getters["items/initItems"]
    this.allUsers = await this.$store.getters.initUsers.filter((user: any) => parseInt(user.id) !== JSON.parse(localStorage.getItem('id'))).sort((a, b) => parseInt(a.id) - parseInt(b.id))
    const res = await this.$axios.get(`https://api.pexels.com/v1/search?query=space&per_page=${this.userState.items.length}`, { headers: { "Authorization": "563492ad6f91700001000001299dd01e9c5e4bddbaafefd70f7e89a3" } })
    
    this.sources = res.data.photos
  },
  methods: {
    async changeStatus(params : any) {
      const filteredMessages = await this.messages.filter(msg => parseInt(msg.id) !== parseInt(params.id))
      const newMessages = [params.item, ...filteredMessages]
      this.messages = newMessages
    },
    updateUser (newUser: Object) {
      this.$store.commit("addUser", newUser)
    },
    async changeUser(id: string, user: any) {
      const newUser = {
        ...user,
        password: this.password
      }
      const body = JSON.stringify(newUser)
      this.$store.dispatch('putUser', this.$store.state.user.id, body)
    },
    updateItems(newItem) {
      const allNewItems = this.allItems.map(item => item.id === newItem.item ? { ...item, votes: [...item.votes, newItem ] } : item)
      this.allItems = allNewItems
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
}
</script>

<style scoped>
.p-1 {
  padding: 0.5rem;
}

.items-container {
  max-width: 1500px;
  margin: auto;
  display: flex;
}

.message-holder {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
}
</style>