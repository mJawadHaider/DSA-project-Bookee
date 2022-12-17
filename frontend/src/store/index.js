import Vue from 'vue';
import Vuex from 'vuex';

import globalStore from './global';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    global: {
      namespaced: true,
      ...globalStore,
    },
  },
});
