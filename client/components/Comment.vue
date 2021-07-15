<template>
  <article class="comment">
    <small>#{{ $props.comment.id }} #I{{ $props.comment.item }} #U{{ $props.comment.user }}</small>
    <p>{{ $props.comment.text }}</p>
    <div class="user">
      <nuxt-link class="expand" v-if="user.length > 0" :to="`/${this.$props.comment.user}`">{{ user }}</nuxt-link>
    </div>
  </article>  
</template>

<script>
// createdAt
// updatedAt
export default {
  name: "Comment",
  data() {
    return {
      user: ""
    }
  },
  mounted() {
    (async () => {
      const res = await this.$axios.get(`http://localhost:4500/users/${this.$props.comment.user}`)
      this.user = res.data.name
    })()
  },
  props: {
    comment: Object
  }
}
</script>

<style scoped>
.comment {
  border: 1px solid white;
  margin: 1.5rem 0;
  padding: 1.5rem;
}

.comment > small {
  font-weight: bold;
}

.comment > p {
  font-size: 20px;
}

.comment > .user {
  padding: 1rem 0;
  text-align: right;
  font-size: 25px;
}

.expand {
  position:relative;
  text-decoration:none;
  display:inline-block;
}
.expand:after {
  display:block;
  content: '';
  border-bottom: solid 3px rgba(255, 255, 255, 1);  
  transform: scaleX(0);  
  transition: transform 250ms ease-in-out;
  transform-origin:100% 50%
}
.expand:hover:after { 
  transform: scaleX(1);
  transform-origin:0 50%;
}
</style>