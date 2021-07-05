<template>
  <div class="container">
    <form @submit.prevent="login" class="form">
      <h1 class="desc">Log into your account!</h1>
      <input name="email" type="email" v-model="email" placeholder="Your E-mail" class="field">
      <input name="password" type="password" v-model="password" placeholder="Your Password" class="field">
      <button type="submit" class="submit">
        <fa-icon :icon="['fas', 'chevron-left']" />
        <span>Submit</span>
        <fa-icon :icon="['fas', 'chevron-right']" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = JSON.stringify({ email: this.email, password: this.password })
      const res = await this.$axios.post("http://localhost:4500/users/login", body, config)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      window.location.reload(true)
    }
  }
}
</script>

<style>
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
  }

  .submit {
    padding: 0.5rem 0;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-around;
    border-radius: 1rem;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .desc {
    text-align: center;
    margin-bottom: 1rem;
  }
</style>