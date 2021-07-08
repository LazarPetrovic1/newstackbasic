<template>
  <main class="container">
    <h2 class="title">All posts here</h2>
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
      items: []
    }
  },
  async mounted() {
    await this.$store.dispatch("items/getAllItems")
    await this.fillItems()
  },
  methods:{
    ...mapActions(["items/getAllItems"]),
    fillItems() {
      this.items = this.$store.getters["items/initItems"]
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