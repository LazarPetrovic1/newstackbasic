<template>
  <nav class="navigation">
    <ul class="link-list">
      <li v-if="isUser">
        <fa-icon :icon="['fas', 'home']" />
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li v-if="!isUser">
        <fa-icon :icon="['fas', 'sign-in-alt']" />
        <nuxt-link to="/login">Log in</nuxt-link>
      </li>
      <li v-if="!isUser">
        <fa-icon :icon="['fas', 'user-plus']" />
        <nuxt-link to="/register">Register</nuxt-link>
      </li>
      <li v-if="isUser">
        <fa-icon :icon="['fas', 'sign-out-alt']" />
        <button @click="logout" class="nuxt-link-button pointer">Sign out</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: "Navbar",
  data() {
    return {
      token: '',
      isUser: false,
    }
  },
  computed: {
    ...mapGetters({
      initUser: 'index/initUser'
    }),
    ...mapState(['user'])
  },
  async mounted() {
    // MORA ARROW FUNC
    await (async () => {
      const token = localStorage.getItem('token')
      if (token) {
        this.isUser = true
        this.$nuxt.$options.router.push("/")
      }
      this.token = token
    })()
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.$nuxt.$options.router.push("/login")
      this.token = ''
      this.isUser = false
    }
  },
  watch: {
    $route() {
      (() => {
        const token = localStorage.getItem('token')
        if (token) {
          this.isUser = true
        }
        this.token = token
      })()
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

.nuxt-link-button {
  background: transparent;
  color: white;
  border: none;
  font-size: 23px;
}

.nuxt-link-button:active,
.nuxt-link-button:focus {
  outline: none;
}
</style>