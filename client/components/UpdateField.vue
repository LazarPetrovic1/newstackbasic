<template>
  <form class="dib" v-if="isEditing" @submit.prevent="changeUser($props.id, $props.user)">
    <input class="field w-500 dib" type="text" v-model="value">
    <button type="submit" class="fs-24">
      <fa-icon :icon="['fas', 'times']" @click="setEditing(false)" />
    </button>
    <button type="submit" class="fs-24">
      <fa-icon :icon="['fas', 'check-double']" />
    </button>
  </form>
  <div v-else class="dib">
    <h2>{{ $props.item }}</h2>
    <button type="button" class="fs-24" @click="setEditing(true)">
      <fa-icon :icon="['fas', 'edit']" />
    </button>
  </div>
</template>

<script>
export default {
  name: "UpdateField",
  props: ['item', 'id', 'user', 'itemName'],
  data() {
    return {
      isEditing: false,
      value: this.$props.item
    }
  },
  created() {
    console.log(this.$props);
  },
  methods: {
    async changeUser(id, user) {
      const newUser = {
        ...this.$props.user
      }
      newUser[this.$props.itemName] = this.value
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = JSON.stringify(newUser)
      const res = await this.$axios.put(`http://localhost:4500/users/${this.$props.id}`, body, config)
      await this.$emit("user-changed", res.data)
    },
    setEditing(val) {
      this.isEditing = val
      this.value = val ? this.$props.item : ''
    }
  }
}
</script>

<style>
.dib {
  display: inline-block !important;
}

.w-500 {
  min-width: 500px;
}

.fs-24 {
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 1rem;
  outline: none;
  border: none;
}
</style>