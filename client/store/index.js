export const state = () => ({
  user: null,
  users: []
})

export const mutations = {
  addUser(state, user) {
    state.user = user
  },
  populateUsers(state, user) {
    state.users = user.splice('')
  }
}

export const actions = {
  async getUser({ commit, }, id) {
    const res = await this.$axios.get(`http://localhost:4500/users/${id}`)
    await commit("addUser", res.data)
  },
  async putUser({ commit }, id, body) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await this.$axios.put(`http://localhost:4500/users/${id}`, body, config)
    await commit("addUser", res.data)
  },
  async populateUsers({ commit }){
    const res = await this.$axios.get(`http://localhost:4500/users`);
    await commit ('populateUsers', res.data);
  },
  async addUser({ commit }, user) {
    await commit('addUser', user)
  }
}

export const getters = {
  storeUser: (state) => state,
  initUsers: (state) => state.users,
  initUser: (state) =>  state.user
}