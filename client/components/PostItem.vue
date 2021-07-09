<template>
  <nuxt-link :to="'/items/' + $props.item.id">
    <div class="postitem">
      <small>#{{ $props.item.id }}</small>
      <div class="metaholder">
        <span class="metatag" v-for="metaitem in $props.item.meta" :key="metaitem">{{ metaitem }}</span>
      </div>
      <h2 class="title">{{ $props.item.title }}</h2>
      <p class="content">{{ $props.item.content.replace(/\\n/g, "\r\n") }}</p>
      <p v-if="user.name" style="font-size: 1.2rem; padding: 1rem; text-align: right">{{ user.name }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    item: Object
  },
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    await this.getUser()
  },
  methods: {
    async getUser() {
      const res = await this.$axios.get(`http://localhost:4500/users/${this.item.author}`)
      this.user = await res.data
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: white;
}

.postitem {
  padding: 1.5rem;
  border-radius: 1rem;
  margin: 2rem;
  border: 3px double white;
}

.metaholder {
  display: flex;
  max-width: 400px;
  margin: 0.3rem 0 0.3rem auto;
  justify-content: space-evenly;
}

.metatag {
  display: inline-block;
  padding: 0.1rem 0.25rem;
  margin: 0 0.3rem;
  border-radius: 0.3rem;
  background: #5a5a5a;
  color: white;
  cursor: pointer;
}

.title {
  font-size: 3rem;
  text-align: center;
}

.content {
  font-size: 1.7rem;
  margin: 1rem 0.75rem;
}
</style>