export const state = () => ({
  selectedItem: null,
  allItems: []
})

export const mutations = {
  addItem(state, item) {
    state.selectedItem = item
  },
  getAllItems(state, items) {
    state.allItems = items
  },
  pushItem(state, item) {
    state.allItems.push(item)
  }
}

export const actions = {
  async getItem({ commit, }, id) {
    const res = await this.$axios.get(`http://localhost:4500/items/${id}`)
    await commit("addItem", res.data)
  },
  async putItem({ commit }, id, body) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await this.$axios.put(`http://localhost:4500/items/${id}`, body, config)
    await commit("addItem", res.data)
  },
  async getAllItems({ commit }){
    const res = await this.$axios.get(`http://localhost:4500/items`);
    await commit ('getAllItems', res.data);
  },
  async addItem({ commit }, item) {
    await commit('pushItem', item)
  }
}

export const getters = {
  getFullStateItem: (state) => state,
  initItems: (state) => state.allItems,
  initItem: (state) => state.selectedItem
}