<template>
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
      <button @click="changeUser(userState.id, user)" class="fs-24">
        <fa-icon :icon="['fas', 'check-double']" />
      </button>
    </p>
  </div>
  <div v-else>
    <h2>Nothing happened</h2>
  </div>
</template>

<script lang="ts">
import UpdateField from "../components/UpdateField.vue"
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: "Home",
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      storeUser: "storeUser"
    })
  },
  data() {
    return {
      userState: null,
      password: ''
    }
  },
  components: {
    UpdateField
  },
  async mounted() {
    // this.userState = await this.$store.$getters["storeUser"]
    // console.log(this.userState, "STATE");
    await this.$store.dispatch('populateUsers');
    console.log(await this.$store.getters.initUsers)
    
  },
  methods: {
    ...mapMutations({
      addUser: 'addUser'
    }),
    ...mapActions(['getUser', 'putUser']),
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
    ps() {
      this.userState = this.$store.user
    }
  }
}
</script>
