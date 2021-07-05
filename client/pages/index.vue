<template>
  <div v-if="user && user.name && user.email && user.password">
    <p>Name: <UpdateField @user-changed="updateUser" :id="user.id" :user="user" itemName="name" :item="user.name" /></p>
    <p>E-Mail: <UpdateField @user-changed="updateUser" :id="user.id" :user="user" itemName="email" :item="user.email" /></p>
    <p>
      <span>Change password: </span>
      <input
        style="display: inline-block; margin-bottom: 1rem; padding: 0.5rem 1rem;"
        type="password"
        :placeholder="user.password"
        v-model="password"
      >
      <button @click="changeUser(user.id, user)" class="fs-24">
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

export default {
  name: "Home",
  data() {
    return {
      user: null,
      password: ''
    }
  },
  mounted() {
    const stringifiedUser = localStorage.getItem('user')
    console.log("stringifiedUser", stringifiedUser);
    if (stringifiedUser) {
      const parsedUser = JSON.parse(stringifiedUser)
      this.user = parsedUser
    }
  },
  components: {
    UpdateField
  },
  methods: {
    updateUser (newUser: Object) {
      localStorage.setItem('user', JSON.stringify(newUser))
      window.location.reload(true)
    },
    async changeUser(id: string, user: any) {
      console.log("CHANGE USER - DIS", this);
      
      const newUser = {
        ...user,
        password: this.password
      }
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = JSON.stringify(newUser)
      const res = await this.$axios.put(`http://localhost:4500/users/${user.id}`, body, config)
      localStorage.setItem('user', JSON.stringify(res.data))
      window.location.reload(true)
    }
  }
}
</script>
