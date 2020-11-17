export default {
  singer: state => state.singer,
  play: state => state.play,
  playTime: state => state.playTime,
  fullScreen: state => state.fullScreen,
  playList: state => state.playList,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong: (state, getters) => {
    return state.playList[state.currentIndex] || {};
  },
  popularSongs: state => state.popularSongs,
  topList: state => state.topList
};
