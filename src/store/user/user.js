import getters from './getter';
import mutations from './mutations';
import actions from './actions';
const user = {
  state: {
    qq_num: '1138245754',
    searchHistory: [],
    playHistory: [] // 播放历史
  },
  getters,
  mutations,
  actions
};

export default user;
