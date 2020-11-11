export default {
  singer: state => state.singer,
  play: state => state.play,
  fullScreen: state => state.fullScreen,
  playList: state => state.playList,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong: (state, getters) => {
    return state.playList[state.currentIndex] || {};
  }
};
