<template>
  <nav class="navigation">
    <ul class="link-list">
      <li v-if="isUser">
        <fa-icon :icon="['fas', 'home']" />
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li v-if="isUser">
        <fa-icon :icon="['fas', 'plus']" />
        <nuxt-link to="/items/post">Post</nuxt-link>
      </li>
      <li v-if="isUser">
        <fa-icon :icon="['fas', 'mail-bulk']" />
        <nuxt-link to="/items">Posts</nuxt-link>
      </li>
      <li style="position: relative;" @mouseleave="hideDD">
        <fa-icon :icon="['fas', 'history']" />
        <button @click="showDD" class="nuxt-link-button pointer">
          History...
        </button>
        <div v-if="showDropDown" class="additional">
          <div>
            <nuxt-link to="/history/users">...of users</nuxt-link>
            <fa-icon :icon="['fas', 'users']" />
          </div>
          <div>
            <nuxt-link to="/history/items">...of items</nuxt-link>
            <fa-icon :icon="['fas', 'file-import']" />
          </div>
          <div>
            <nuxt-link to="/history/comments">...of comments</nuxt-link>
            <fa-icon :icon="['fas', 'comments']" />
          </div>
        </div>
      </li>
      <li>
        <fa-icon :icon="['fas', 'folder']" />
        <nuxt-link @click="logout" to="/logs">Logs</nuxt-link>
      </li>
      <li v-if="isUser">
        <fa-icon :icon="['fas', 'sign-out-alt']" />
        <button @click="logout" class="nuxt-link-button pointer">Sign out</button>
      </li>
      <li v-if="!isUser">
        <fa-icon :icon="['fas', 'sign-in-alt']" />
        <nuxt-link to="/login">Log in</nuxt-link>
      </li>
      <li v-if="!isUser">
        <fa-icon :icon="['fas', 'user-plus']" />
        <nuxt-link to="/register">Register</nuxt-link>
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
      showDropDown: false
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
        this.$router.push("/")
      }
      this.token = token
    })()
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.$router.push("/login")
      this.token = ''
      this.isUser = false
    },
    showDD() {
      this.showDropDown = true
    },
    hideDD() {
      this.showDropDown = false
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

.additional {
  position: absolute;
  min-width: 250px;
  z-index: 5;
  background: #111;
}

.additional > div {
  display: flex;
  justify-content: space-between;
  transition: all 100ms;
  cursor: pointer
}

.additional > div:hover {
  background: #333;
}
</style>