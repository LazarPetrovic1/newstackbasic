<template>
  <nuxt-link :to="`/${user.id}`" class="normalize-links">
    <section class="card-container pointer">
      <article class="shape-container">
        <div>
          <img class="img" :src="`https://robohash.org/${user.id}?set=set4&size=200x200`" :alt="`${user.name}'s avatar`">
        </div>
        <div class="text-container">
          <small>#{{ user.id }}</small>
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
          <p>
            <span>
              <small>
                Created at: <time :datetime="user.createdAt" title="Format: DD. MM. YYYY @ HH: MM: SS">{{ dateCreated }}</time>
              </small>
            </span>
            <br>
            <span>
              <small>
                Updated at: <time :datetime="user.updatedAt" title="Format: DD. MM. YYYY @ HH: MM: SS">{{ dateUpdated }}</time>
              </small>
            </span>
          </p>
        </div>
      </article>
    </section>
  </nuxt-link>
</template>

<script>
import { dateFromTimeStamp } from "../utils/date"
export default {
  name: "UserCard",
  props: {
    user: Object
  },
  computed: {
    dateCreated() {
      return dateFromTimeStamp(this.$props.user.createdAt)
    },
    dateUpdated() {
      return dateFromTimeStamp(this.$props.user.updatedAt)
    }
  }
}
</script>

<style scoped>
.card-container {
  border: 3px double white;
  border-radius: 1rem;
  display: inline-block;
  padding: 1.5rem;
  margin: 1.5rem;
  transition: 300ms all ease;
}

.card-container:hover {
  transform: scale(1.1);
}

.shape-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.img {
  max-width: 200px;
  width: 100%;
}

.text-container {
  font-size: 115%;
}
</style>