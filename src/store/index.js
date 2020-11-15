import Vue from 'vue';
import Vuex from 'vuex';
import music from './music/music';
import user from './user/user';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    music,
    user
  }
});
