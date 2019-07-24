export default {
  namespaced: true,
  state: {
    count: 123120
  },
  getters: {
    getCount: (state) => () => state.count
  },
  mutations: {
    add(state) {
      state.count++;
    }
  },
  actions: {
    add(context, payload) {
      context.commit('add', payload);
    }
  }
};