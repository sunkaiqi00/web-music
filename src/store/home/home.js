import getters from './getters';
import actions from './actions';
const home = {
  state: {
    scrollOffsetY: 0
  },
  mutations: {
    SET_SCROLL_OFFSETY(state, offsetY) {
      state.scrollOffsetY = offsetY;
    }
  },
  getters,
  actions
};
export default home;
