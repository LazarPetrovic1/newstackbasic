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
    <div v-if="allUsers.length > 0">
      <UserCard v-for="person in allUsers" :user="person" :key="person.id" />
    </div>
    <div v-if="userState && userState.items.length > 0" class="items-container">
      <article v-for="(item, i) in userState.items" :key="item.id">
        <Item
          :item="item"
          :src="sources[i]"
        />
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import UpdateField from "../components/UpdateField.vue"
import UserCard from "../components/UserCard.vue"
import Item from "../components/Item.vue"
import { mapGetters } from 'vuex'

export default {
  name: "Home",
  components: {
    UpdateField,
    UserCard,
    Item
  },
  // PROPS,
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
      sources: string[]
    } = {
      userState: null,
      password: '',
      allUsers: [],
      sources: []
    }
    return data
  },
  computed: {
    ...mapGetters({
      storeUser: "storeUser",
      initUser: "initUser",
      initUsers: "initUsers"
    })
  },
  async mounted() {
    if (!localStorage.getItem('token') && !JSON.parse(localStorage.getItem('id'))) {
      this.$router.push("/login")
      return;
    }
    await this.$store.dispatch('populateUsers');
    await this.$store.dispatch('getUser', JSON.parse(localStorage.getItem('id')));
    console.log("PRACES TACKA ENV", process.env);
    
    this.userState = await this.$store.getters.initUser
    this.allUsers = await this.$store.getters.initUsers.filter((user: any) => parseInt(user.id) !== JSON.parse(localStorage.getItem('id'))).sort((a, b) => parseInt(a.id) - parseInt(b.id))
    const res = await this.$axios.get(`https://api.pexels.com/v1/search?query=space&per_page=${this.userState.items.length}`, { headers: { "Authorization": "563492ad6f91700001000001299dd01e9c5e4bddbaafefd70f7e89a3" } })
    
    this.sources = res.data.photos
  },
  methods: {
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
</style>