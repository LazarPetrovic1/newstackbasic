<template>
  <nav class="navigation">
    <ul class="link-list">
      <li v-if="token">
        <fa-icon :icon="['fas', 'home']" />
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li v-if="!token">
        <fa-icon :icon="['fas', 'sign-in-alt']" />
        <nuxt-link to="/login">Log in</nuxt-link>
      </li>
      <li v-if="!token">
        <fa-icon :icon="['fas', 'user-plus']" />
        <nuxt-link to="/register">Register</nuxt-link>
      </li>
      <li v-if="token">
        <fa-icon :icon="['fas', 'sign-out-alt']" />
        <nuxt-link to="/login" href="#" @click="logout">Sign out</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      token: ''
    }
  },
  mounted() {
    // MORA ARROW FUNC
    (() => {
      console.log("DIS", this);
      const token = localStorage.getItem('token')
      if (token) {
        this.$nuxt.$options.router.push("/")
      }
      this.token = token
    })()
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$nuxt.$options.router.push("/login")
      this.token = ''
    }
  }
}
</script>

<style scoped>
.navigation {
  padding: 1rem;
}

.link-list {
  list-style-type: none;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.link-list > li {
  margin: 0.5rem;
  font-size: 1.5rem;
}

.link-list > li > a {
  color: #eee;
  padding: 0.3rem;
  text-decoration: none;
  background-color: transparent;
}
</style>