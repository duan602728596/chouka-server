export default {
  namespaced: true,
  state: {
    query: undefined,
    list: []
  },
  getters: {
    getQuery: (state) => () => state.query,
    getList: (state) => () => state.list
  }
};