<template>
  <div class="central">
      <p style="margin-bottom: 2rem;">
        There is a total of <span class="mark">{{ users.length }}</span> users, <span class="mark">{{ items.length }}</span> items and <span class="mark">{{ votes.length }}</span> votes in the database.
      </p>
      <p style="margin-bottom: 2rem;">Users' JSON: </p>
      <p v-if="users.length > 0" class="json">
        <span class="mark">
          {{ JSON.stringify(users) }}
        </span>
      </p>
      <p style="margin-bottom: 2rem;">Items' JSON: </p>
      <p v-if="items.length > 0" class="json">
        <span class="mark">
          {{ JSON.stringify(items) }}
        </span>
      </p>
      <p style="margin-bottom: 2rem;">Votes' JSON: </p>
      <p v-if="votes.length > 0" class="json">
        <span class="mark">
          {{ JSON.stringify(votes) }}
        </span>
      </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      items: [],
      votes: []
    }
  },
  async mounted() {
    let res, resp;
    res = await this.$axios.get('http://localhost:4500/users')
    console.log("REZ", res.data);
    this.users = await res.data
    res = await this.$axios.get('http://localhost:4500/items')
      this.items = await res.data
    res.data.forEach(async item => {
      resp = await this.$axios.get(`http://localhost:4500/control/${item.id}`)
      this.votes = await this.votes.concat(resp.data)
    });
  },
  head() {
    return {
      title: `Basic App | History of items in database session`,
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