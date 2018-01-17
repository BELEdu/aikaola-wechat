import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: null,
  },

  mutations: {
    initUser(state, userInfo) {
      // eslint-disable-next-line
      state.userInfo = userInfo;
    },
  },
});

export default store;
