export const state = () => ({
  user: []
})

export const mutations = {
  addUser(state, user) {
    state.user = user
  },
  populateUsers(state, user) {
    state.user = user.splice('')
    console.log(state);
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
    const res = await this.$axios.get(`http://localhost:4500/users/${id}`, body, config)
    await commit("addUser", res.data)
  },
  async populateUsers({commit}){
    const res = await this.$axios.get(`http://localhost:4500/users`);
    await commit ('populateUsers', res.data);
  }
}

export const getters = {
  storeUser: (state) => {
    return state;
  },
  initUsers: (state) => {
    console.log(state);
    return state.user;
  }
}