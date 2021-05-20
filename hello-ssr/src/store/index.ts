import { createStore } from 'vuex';

export default createStore({
  state: {
    win: 'hello vuex!!',
  },
  getters: {
    win: (state) => state.win,
  },
  mutations: {},
  actions: {},
  modules: {},
});
