import mutations from './mutations';
import getters from './getters';
import actions from './actions';
const singer = {
  state: {
    singer: null,
    play: false, // 播放状态
    fullScreen: false, //  全屏状态
    playList: [], // 随机播放列表
    sequenceList: [], // 顺序播放列表
    mode: 0, // 播放模式  0 顺序   1 单曲   2 随机
    currentIndex: 0 // 当前播放 索引
  },
  mutations,
  getters,
  actions
};
export default singer;
