<template>
  <section class="my-2">
    <form class="flex" v-if="isEditing" @submit.prevent="changeUser($props.id, $props.user)">
      <div class="my-2 flex">
        <input class="field w-500 dib" type="text" v-model="value">
        <button type="submit" class="fs-24 pointer px-2">
          <fa-icon :icon="['fas', 'times']" @click="setEditing(false)" />
        </button>
        <button type="submit" class="fs-24 pointer px-2">
          <fa-icon :icon="['fas', 'check-double']" />
        </button>
      </div>
    </form>
    <div v-else class="flex">
      <h2 class="m-1">{{ $props.item }}</h2>
      <button type="button" class="fs-24 pointer p-1" @click="setEditing(true)">
        <fa-icon :icon="['fas', 'edit']" />
      </button>
    </div>
  </section>
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

.flex {
  display: flex;
  max-width: 600px;
}

.w-500 {
  min-width: 500px;
}

.fs-24 {
  font-size: 1.5rem;
  border-radius: 1rem;
  outline: none;
  border: none;
}

.field {
  padding: 0.5rem 1rem;
  width: 100%;
}

.p-1 {
  padding: 0.5rem;
}

.px-2 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.my-2 {
  margin: 1rem 0;
}

.m-1 {
  margin: 0.5rem;
}
</style>