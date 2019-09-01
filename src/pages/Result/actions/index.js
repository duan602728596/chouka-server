export default {
  namespaced: true,
  state: {
    query: undefined, // 查询条件
    list: [],         // 查询结果
    points: 0         // 积分
  },
  getters: {
    getQuery: (state) => () => state.query,
    getList: (state) => () => state.list,
    getPoints: (state) => () => state.points
  }
};