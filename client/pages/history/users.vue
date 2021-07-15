<template>
  <div class="central">
    <div>
      <p style="margin-bottom: 2rem;">There is a total of <span class="mark">{{ users.length }}</span> users in the database.</p>
      <p style="margin-bottom: 2rem;">Users' JSON: </p>
      <p v-if="users.length > 0" class="json">
        <span class="mark">
          {{ JSON.stringify(users) }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    const res = await this.$axios.get('http://localhost:4500/users')
    this.users = res.data
    console.log("AJTEMSTAF", res.data);
  },
  head() {
    return {
      title: `Basic App | History of users in database session`,
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "description",
          content: `This is the history page`
        }
      ]
    }
  }
}
</script>

<style scoped>
.mark {
  display: inline-block !important;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  background-color: hsl(123, 83%, 14%);
}

.json {
  max-width: 350px;
  word-break: break-all;
}

.central {
  height: calc(100vh - 77px);
  display: grid;
  place-items: center;
}
</style>