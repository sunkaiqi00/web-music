import getters from './getter';
import mutations from './mutations';
import actions from './actions';

const user = {
  state: {
    qq_num: '1138245754',
    searchHistory: [], // 搜索历史
    playHistory: [], // 播放历史
    favoriteSongs: [] // 喜欢歌单
  },
  getters,
  mutations,
  actions
};

export default user;
