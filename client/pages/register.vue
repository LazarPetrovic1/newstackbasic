<template>
  <div class="container">
    <form @submit.prevent="register" class="form">
      <h1 class="desc">Create an account!</h1>
      <input type="text" name="name" v-model="name" placeholder="Enter your name" class="field">
      <input name="email" type="email" v-model="email" placeholder="Your E-mail" class="field">
      <div class="rel">
        <input name="password" :type="seePassword ? 'text' : 'password'" v-model="password" placeholder="Your Password" class="field">
        <fa-icon class="absicon pointer" @click="() => seePassword = !seePassword" :icon="seePassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
      </div>
      <div class="rel">
        <input name="password2" :type="seePassword2 ? 'text' : 'password'" v-model="password2" placeholder="Confirm your password" class="field">
        <fa-icon class="absicon pointer" @click="() => seePassword2 = !seePassword2" :icon="seePassword2 ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
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
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: "Register",
  computed: {
    ...mapState(['user'])
  },
  head() {
    return {
      title: "Basic App | Register",
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: "This is the registration of the user"
        }
      ]
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password2: '',
      infomsg: '',
      seePassword: false,
      seePassword2: false
    }
  },
  methods: {
    ...mapActions(['getUser', 'addUser']),
    ...mapMutations({
      addUser: 'addUser'
    }),
    async register() {
      if (this.password !== this.password2) {
        this.infomsg = "Please confirm your password, as they do not match"
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = JSON.stringify({ name: this.name, email: this.email, password: this.password })
      await this.$axios.post("http://localhost:4500/users", body, config)
      const loginBody = JSON.stringify({ email: this.email, password: this.password })
      const newRes = await this.$axios.post("http://localhost:4500/users/login", loginBody, config)
      localStorage.setItem('token', newRes.data.token)
      localStorage.setItem('id', newRes.data.user.id)
      this.$store.dispatch('addUser', newRes.data.user)
      this.$nuxt.$options.router.push("/")
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

  .infomsg {
    text-align: center;
    /* font-size: 0.8rem; */
    font-weight: bolder;
    color: #d45151;
    margin: 1rem 0 1.5rem 0;
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
</style>