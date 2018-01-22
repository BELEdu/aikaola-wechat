import Vue from 'vue';
import Vuex from 'vuex';
import Http from '@/plugins/http';

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

  actions: {
    initUser({ commit }) {
      return Http.get('/center/classes')
        .then((res) => {
          commit('initUser', res);

          return res;
        });
    },
  },
});

export default store;
