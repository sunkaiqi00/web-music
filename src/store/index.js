import Vue from 'vue';
import Vuex from 'vuex';
import singer from './singer/singer';
import user from './user/user';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    singer,
    user
  }
});
