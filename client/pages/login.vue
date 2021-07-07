<template>
  <div class="container">
    <form @submit.prevent="login" class="form">
      <h1 class="desc">Log into your account!</h1>
      <input name="email" type="email" v-model="email" placeholder="Your E-mail" class="field">
      <div class="rel">
        <input name="password" :type="seePassword ? 'text' : 'password'" v-model="password" placeholder="Your Password" class="field">
        <fa-icon class="absicon pointer" @click="() => seePassword = !seePassword" :icon="seePassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
      </div>
      <div v-if="infomsg" class="infomsg">{{ infomsg }}</div>
      <button type="submit" class="submit pointer">
        <fa-icon :icon="['fas', 'chevron-left']" />
        <span>Submit</span>
        <fa-icon :icon="['fas', 'chevron-right']" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: "Login",
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      email: '',
      password: '',
      infomsg: '',
      seePassword: false,
      infomsg: ''
    }
  },
  head() {
    return {
      title: "Basic App | Login",
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: "This is the login page of the application"
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getUser', 'addUser']),
    ...mapMutations({
      addUser: 'addUser'
    }),
    async login() {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = JSON.stringify({ email: this.email, password: this.password })
      const res = await this.$axios.post("http://localhost:4500/users/login", body, config)
      if (res.data.token && res.data.user.id) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.user.id)
        this.$store.dispatch('addUser', res.data.user)
      this.$nuxt.$options.router.push("/")
      } else {
        this.infomsg = res.data
      }
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
  }

  .form {
    max-width: 650px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem auto;
    border: 3px double white;
    padding: 2rem;
  }

  .field {
    display: block;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
  }

  .submit {
    padding: 0.5rem 0;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-around;
    border-radius: 1rem;
    border: none;
    outline: none;
  }

  .desc {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .absicon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-100%);
    z-index: 2;
  }

  .rel {
    position: relative;
  }

  .infomsg {
    text-align: center;
    /* font-size: 0.8rem; */
    font-weight: bolder;
    color: #d45151;
    margin: 1rem 0 1.5rem 0;
  }

  .desc {
    text-align: center;
    margin-bottom: 1rem;
  }
</style>