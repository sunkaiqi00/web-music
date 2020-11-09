import Vue from 'vue';
import Vuex from 'vuex';
import home from './home/home';
import singer from './singer/singer';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    singer
  }
});
