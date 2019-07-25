export default {
  namespaced: true,
  state: {
    query: undefined
  },
  getters: {
    getQuery: (state) => () => state.query
  }
};