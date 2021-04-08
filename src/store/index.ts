import { createStore } from 'vuex';

export default createStore({
  state: {
    win: 'hello win',
  },
  getters: {
    win: (state) => state.win,
  },
  mutations: {},
  actions: {},
  modules: {},
});
