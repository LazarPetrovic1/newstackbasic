<template>
  <div class="form border">
    <div class="form-title">
      <h2>Create a Post</h2>
    </div>
    <div class="form-group" style="padding: 0 1.5rem;">
      <label for="metaValue">Meta tags</label>
      <input type="text" @keydown.enter="addMetaTag" name="metaValue" v-model="metaValue" placeholder="<Meta>: Press <Enter> after to add the tag after writing it">
      <div style="margin-top: 1rem">
        <span class="meta-tag" @click="removeTag(item)" v-for="item in meta" :key="item">
          {{ item }}
        </span>
      </div>
      <div class="msg" v-if="metaMsg.length > 0">{{ metaMsg }}</div>
    </div>
    <form class="form notop" @submit.prevent="createPost">
      <div class="form-group">
        <label for="title">Title of the post</label>
        <input type="text" name="title" v-model="title" placeholder="Enter your post title">
      </div>
      <div class="form-group">
        <label for="content">Content of the post</label>
        <textarea type="text" name="content" v-model="content" placeholder="Post substance" />
      </div>
      <div class="form-group">
        <button type="submit" class="submitter">
          <fa-icon :icon="['fas', 'paper-plane']" /> Submit <fa-icon :icon="['fas', 'paper-plane']" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
export default {
  name: "Post",
  computed: {
    ...mapState(['selectedItem', 'allItems']),
    ...mapMutations({
      pushItem: 'items/pushItem'
    }),
    ...mapGetters({
      initItems: 'items/initItems'
    })
  },
  head() {
    return {
      title: `Basic App | Create an item`,
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: `This is the create post page`
        }
      ]
    }
  },
  data() {
    return {
      title: '',
      content: '',
      meta: [],
      metaValue: '',
      metaMsg: ''
    }
  },
  methods: {
    ...mapActions(['items/addItem']),
    async createPost() {
      console.log("!!!CREATED ITEM!!!");
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = JSON.stringify({
        title: this.title,
        content: this.content,
        meta: this.meta
      })
      const res = await this.$axios.post("http://localhost:4500/items/", body, config)
      await this.$store.dispatch("items/addItem", res.data)
      await this.$nuxt.$options.router.push("/")
    },
    addMetaTag() {
      console.log("VUEX STORE FROM POST", this.$store);
      // console.log("VUEX STORE FROM POST", this.$store.getters["items/initItem"]);
      const isNotInMeta = this.meta.filter(val => val === this.metaValue).length < 1
      const isOver10 = this.meta.length > 9
      if (isNotInMeta && !isOver10) {
        this.meta.push(this.metaValue);
        this.metaValue = ""
      } else if (!isNotInMeta) {
        this.metaValue = ""
        this.metaMsg = "You have already added this specific meta tag, please use another one."
      } else if (isOver10) {
        this.metaValue = ""
        this.metaMsg = "You are not allowed to have over 10 meta tags per post."
      }
    },
    removeTag(item) {
      this.meta = this.meta.filter(val => val !== item)
    }
  }
}
</script>

<style scoped>
  .form {
    max-width: 1150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem auto;
    padding: 1rem 1.5rem;
  }

  .notop {
    padding-top: 0;
    margin-top: 0;
  }

  .border {
    border: 3px double white;
  }

  .form-title {
    text-align: center;
    font-size: 40px;
  }

  .form-group {
    margin: 1rem;
  }

  .form-group > input,
  .form-group > textarea {
    width: 100%;
    padding: 0.75rem;
  }

  .form-group > textarea {
    resize: none;
    height: 450px;
  }

  .form-group > label {
    margin: 1rem 0;
    display: block;
  }

  .submitter {
    padding: 0.75rem 1rem;
    outline: none;
    border-radius: 1rem;
    background: transparent;
    color: white;
    font-weight: 500;
    border: 2px double white;
    cursor: pointer;
    transition: 250ms all ease;
  }

  .submitter:hover {
    background: white;
    color: #001055;
  }

  .msg {
    background-color: #eca0a0;
    color: red;
    text-align: center;
    padding: 0.25rem;
    margin-top: 0.5rem
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
</style>