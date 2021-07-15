<template>
  <div class="item">
    <span class="id">#{{ $props.item.id }}</span>
    <nuxt-link :to="`/items/${$props.item.id}`">
      <img class="image" :src="src && src.src && src.src.medium" :alt="$props.item.title">
      <h2 class="center" style="font-size: 30px;">{{ $props.item.title }}</h2>
      <p class="lead">{{ contentsplitter }}</p>
      <p>Author: {{ $props.item.author }}</p>
      <p style="display: flex; flex-direction: row; padding: 0.5rem 0">
        <span class="meta-tag" v-for="tag in $props.item.meta" :key="tag">{{ tag }}</span>
      </p>
      <p>Created at: {{ created_at }}</p>
      <p>Updated at: {{ updated_at }}</p>
    </nuxt-link>
    <div class="bar">
      <button @click="like" v-if="likes !== null && control">
        <fa-icon :icon="['fas', 'thumbs-up']" :class="{ liked: likes.filter(x => parseInt(x.user) === parseInt(user.id)).length > 0 }" /> <span>{{ likes.length }}</span>
      </button>
      <button @click="dislike" v-if="dislikes !== null && control">
        <fa-icon :icon="['fas', 'thumbs-down']" :class="{ disliked: dislikes.filter(x => parseInt(x.user) === parseInt(user.id)).length > 0 }" /> <span>{{ dislikes.length }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: "Item",
  props: {
    item: Object,
    src: Object
  },
  data() {
    return {
      control: null,
      likes: 0,
      dislikes: 0,
      user: null
    }
  },
  async mounted() {
    const res = await this.$axios.get(`http://localhost:4500/control/item/${this.$props.item.id}`)
    this.control = await res.data
    this.user = this.$store.getters.initUser
    this.likes = this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value > 0)
    this.dislikes = this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value < 0)
  },
  computed: {
    contentsplitter() {
      return this.$props.item.content.length < 80 ? this.$props.item.content : this.$props.item.content.slice(0, 80).concat("...")
    },
    updated_at() {
      return `${new Date(this.$props.item.updatedAt).getDate()}. ${new Date(this.$props.item.updatedAt).getMonth()}. ${new Date(this.$props.item.updatedAt).getFullYear()}`
    },
    created_at() {
      return `${new Date(this.$props.item.createdAt).getDate()}. ${new Date(this.$props.item.createdAt).getMonth()}. ${new Date(this.$props.item.createdAt).getFullYear()}`
    },
    ...mapGetters({
      initUser: 'initUser'
    }),
  },
  methods: {
    async like() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        const body = {
          value: 1,
          user: this.user.id,
          item: this.$props.item.id
        }
        const hasVoted = await this.control.find(vote => vote.user === this.user.id && vote.item === this.$props.item.id)
        if (hasVoted && hasVoted.id) {
          body.id = hasVoted.id
        }
        console.log("HEZVOUTID", hasVoted);
        console.log("BARI", body);
        if (hasVoted && Object.keys(hasVoted).length > 0 && hasVoted.value === 1) {
          await this.$axios.delete(`http://localhost:4500/control/${hasVoted.id}`)
          this.control = await this.control.filter(vote => vote.id !== hasVoted.id)
          this.likes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.user !== hasVoted.id && hasVoted.value > 0)
          this.dislikes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value !== hasVoted.id && hasVoted.value < 0)
          return
        }
        if (hasVoted && Object.keys(hasVoted).length > 0 && hasVoted.value === -1) {
          const newVote = await this.$axios.put(`http://localhost:4500/control/${hasVoted.id}`, JSON.stringify(body), config)
          console.log("NJUVOUT", newVote.data);
          this.control = await this.control.map(vote => vote.id === newVote.data.id ? newVote.data : vote)
          this.likes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.user !== newVote.data.id && vote.value > 0)
          this.dislikes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.user !== newVote.data.id && vote.value < 0)
          return
        }
        const res = await this.$axios.post(`http://localhost:4500/control`, JSON.stringify(body), config)
        await this.control.push(res.data)
        this.likes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value > 0)
        this.dislikes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value < 0)
        await this.$emit("likeDislikeEvent", res.data)
      } catch (e) {
        console.warn(e.name, e.message);
        this.control = []
      }
    },
    async dislike() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        const body = {
          value: -1,
          user: this.user.id,
          item: this.$props.item.id
        }
        const hasVoted = await this.control.find(vote => vote.user === this.user.id && vote.item === this.$props.item.id)
        if (hasVoted && hasVoted.id) {
          body.id = hasVoted.id
        }
        console.log("HEZVOUTID", hasVoted);
        console.log("BARI", body);
        if (hasVoted && Object.keys(hasVoted).length > 0 && hasVoted.value === -1) {
          await this.$axios.delete(`http://localhost:4500/control/${hasVoted.id}`)
          this.control = await this.control.filter(vote => vote.id !== hasVoted.id)
          this.likes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.user !== hasVoted.id && hasVoted.value > 0)
          this.dislikes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value !== hasVoted.id && hasVoted.value < 0)
          return
        }
        if (hasVoted && Object.keys(hasVoted).length > 0 && hasVoted.value === 1) {
          const newVote = await this.$axios.put(`http://localhost:4500/control/${hasVoted.id}`, JSON.stringify(body), config)
          console.log("NJUVOUT", newVote.data);
          this.control = await this.control.map(vote => vote.id === newVote.data.id ? newVote.data : vote)
          this.likes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.user !== newVote.data.id && vote.value > 0)
          this.dislikes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.user !== newVote.data.id && vote.value < 0)
          return
        }
        const res = await this.$axios.post(`http://localhost:4500/control`, JSON.stringify(body), config)
        await this.control.push(res.data)
        this.likes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value > 0)
        this.dislikes = await this.control.filter(vote => parseInt(vote.item) === parseInt(this.$props.item.id)).filter(vote => vote.value < 0)
        await this.$emit("likeDislikeEvent", res.data)
      } catch (e) {
        console.warn(e.name, e.message);
        this.control = []
      }
    }
  }
}
</script>

<style scoped>
  a {
    color: white;
    background: transparent;
    text-decoration: none;
  }

  .item {
    border: 3px double white;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    margin: 1.5rem;
    transition: all 250ms ease;
    max-width: 350px;
    width: 100%;
    position: relative;
    align-self: stretch;
    height: 100%;
  }

  .lead {
    font-size: 22px;
    word-break: break-all;
  }

  .image {
    max-width: 100%;
    width: auto;
  }

  .center {
    text-align: center;
  }

  .id {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    background: #111;
    z-index: 2;
  }

  .item:hover {
    -webkit-box-shadow: 3px 3px 20px 0 #FFD700; 
    box-shadow: 3px 3px 20px 0 #FFD700;
  }

  .meta-tag {
    display: inline-block;
    padding: 0.1rem 0.25rem;
    margin: 0 0.3rem;
    border-radius: 0.3rem;
    background: #5a5a5a;
    color: white;
    cursor: pointer;
  }

  .bar {
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
  }

  .bar > button {
    font-size: 2rem;
    cursor: pointer;
    background: transparent;
    color: white;
    border: 0;
    padding: 0.5rem;
    border-radius: 1rem;
  }

  .liked { color: green; }
  .disliked { color: red; }
</style>
