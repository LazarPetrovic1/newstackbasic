<template>
  <div>
    <div class="container" v-if="Object.keys(item).length > 0">
      <h2 class="title" v-if="item.title">{{ item.title }}</h2>
      <p class="content" v-if="item.content">{{ item.content.replace(/\\n/g, "\n") }}</p>
      <div v-if="comments.length > 0">
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>
      <form @submit.prevent="addComment">
        <input placeholder="Add a comment" class="field w-500 dib" type="text" v-model="comment">
      </form>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import Comment from "../../components/Comment.vue"

export default {
  props: {
    Comment
  },
  data() {
    return {
      item: {},
      comment: "",
      comments: []
    }
  },
  async mounted() {
    (async () => {
      const res = await this.$axios.get(`http://localhost:4500/items/${this.$route.params.id}`)
      this.item = await res.data
    })()
    const res = await this.$axios.get(`http://localhost:4500/comments/item/${this.$route.params.id}`)
    console.log("COMMENTS", res.data);
    this.comments = await res.data
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
    async addComment() {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = JSON.stringify({
        item: this.$route.params.id,
        text: this.comment,
        user: this.item.author
      })
      const res = await this.$axios.post(`http://localhost:4500/comments`, body, config)
      await this.comments.unshift(res.data)
      this.comment = ""
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

.dib {
  display: inline-block !important;
}
.w-500 {
  min-width: 500px;
}

.field {
  padding: 0.5rem 1rem;
  width: 100%;
}
</style>