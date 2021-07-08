<template>
  <div>
    <div class="container" v-if="Object.keys(item).length > 0">
      <h2 class="title" v-if="item.title">{{ item.title }}</h2>
      <p class="content" v-if="item.content">{{ item.content }}</p>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {}
    }
  },
  async mounted() {
    const res = await this.$axios.get(`http://localhost:4500/items/${this.$route.params.id}`)
    console.log("REZ TACKA DEJTA", res.data);
    this.item = await res.data
  },
  head() {
    return {
      title: `Basic App | The item`,
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: `This is the item by id`
        }
      ]
    }
  },
  methods: {
    logdata() {
      console.log("AJTEM", this.item)
    }
  }
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}
</style>