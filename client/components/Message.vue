<template>
  <div class="message">
    <button v-if="isMine || isTheirs" class="close" @click="$props.removeItem($props.message.id)">
      <fa-icon :icon="['fas', 'times']" />
    </button>
    <button v-if="isMine" class="edit" @click="changeEditingType">
      <fa-icon :icon="['fas', 'edit']" v-if="!editing" />
      <fa-icon :icon="['fas', 'paper-plane']" v-else />
    </button>
    <small>From ID: #{{ $props.message.fromUser }}</small>
    <input class="field" v-if="editing" type="text" v-model="noteData" placeholder="Your note">
    <h3 v-else>{{ $props.message.note }}</h3>

    <input class="field" v-if="editing" type="text" v-model="textData" placeholder="Your text">
    <p>{{ $props.message.text }}</p>
    <div @click="showModal" :class="`message-status message-status-${$props.message.status}`"></div>
    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Click on one of the listed message states to change it
      </template>

      <template v-slot:body>
        <ul v-if="statusStates" class="state-list">
          <li v-for="state in statusStates" @click="updateState(message.id, state)" :key="state.id" :class="`message-type message-status-${state.name}`">
            {{ state.text }}
          </li>
        </ul>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue"
import statusStates from "../utils/status"

export default {
  name: "Message",
  props: {
    message: Object,
    removeItem: Function,
    updateMessage: Function,
    isTheirs: Boolean
  },
  compoments: {
    Modal
  },
  data() {
    return {
      isMine: false,
      editing: false,
      noteData: this.$props.message.note,
      textData: this.$props.message.text,
      isModalVisible: false,
      statusStates
    }
  },
  async mounted() {
    const item1 = parseInt(JSON.parse(localStorage.getItem("id")))
    const item2 = parseInt(this.$props.message.fromUser)
    const isMine = item1 === item2
    this.isMine = isMine
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async changeEditingType() {
      if (this.editing) {
        const newMessage = {
          ...this.$props.message,
          note: this.noteData,
          text: this.textData
        }
        await this.$props.updateMessage(this.$props.message.id, newMessage)
      }
      this.editing = !this.editing
    },
    async updateState(id, status) {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const newBody = {
        ...this.$props.message,
        status: status.name
      }
      const res = await this.$axios.put(`http://localhost:4500/messages/status/${id}`, JSON.stringify(newBody), config)
      console.log("REZ TACKA DEJTA", res.data);
      this.$emit("changeStatus", { item: res.data, id })
    }
  }
}
</script>

<style scoped>
.message {
  position: relative;
  display: block;
  padding: 1rem;
  min-width: 350px;
  border: 1px solid white;
  border-radius: 1rem;
  margin: 1rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* REST */
}

.message-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.message-status-received {
  background-color: rgb(38, 0, 255);
}

.message-status-unread {
  background-color: red;
}

.message-status-read {
  background-color: rgb(95, 95, 95);
}

.message-status-responded {
  background-color: forestgreen;
}

.message-status-closed {
  background-color: #111;
}

.close {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  cursor: pointer;
  background: red;
  color: white;
  border: none;
  border-radius: 0;
  outline: none;
  border-top-left-radius: 1rem;
}

.edit {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  cursor: pointer;
  background: #4a4adb;
  color: white;
  border: none;
  border-radius: 0;
  outline: none;
  border-bottom-left-radius: 1rem;
}

.message-type {
  padding: 0.5rem;
  cursor: pointer;
}

.state-list {
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;
}
</style>