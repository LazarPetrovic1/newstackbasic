<template>
  <main class="container">
    <h2 class="title">All posts here</h2>
    <input
      @input="searchTags"
      v-model="search"
      type="search"
      name="search"
      id="search"
      class='field'
      placeholder="Search by meta tag, title or content"
    >
    <section v-if="items.length > 0">
      <PostItem v-for="item in items" :item="item" :key="item.id" />
    </section>
  </main>
</template>

<script>
import PostItem from "../../components/PostItem.vue"
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: {
    PostItem
  },
  head() {
    return {
      title: `Basic App | List all items`,
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: `This is the list all items page`
        }
      ]
    }
  },
  data() {
    return {
      items: [],
      search: ''
    }
  },
  async mounted() {
    await this.$store.dispatch("items/getAllItems")
    await this.fillItems()
  },
  methods: {
    ...mapActions(["items/getAllItems"]),
    fillItems() {
      this.items = this.$store.getters["items/initItems"]
    },
    searchTags(e) {
      if (this.search.length <= 3) {
        this.fillItems()
      } else {
        const metaItems = this.items.filter(item => item.meta.includes(this.search.toLowerCase()))
        const titleItems = this.items.filter(item => item.title.includes(this.search.toLowerCase()))
        const contentItems = this.items.filter(item => item.content.includes(this.search.toLowerCase()))
        const allItems = [...metaItems, ...titleItems, ...contentItems]
        const ids = Array.from(new Set(allItems.map(x => x.id)))
        const uniqueItems = []
        for (let i = 0; i < ids.length; i++) {
          uniqueItems.push(allItems.find(x => x.id === ids[i]))
        }
        this.items = uniqueItems
      }
    }
  },
  computed: {
    ...mapGetters({
      initItems: 'items/initItems'
    }),
    ...mapState(['selectedItem', 'allItems'])
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