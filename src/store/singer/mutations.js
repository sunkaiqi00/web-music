export default {
  SET_SINGER(state, singer) {
    state.singer = singer;
  },
  SET_PLAY(state, play) {
    state.play = play;
  },
  SET_FULLSCREEN(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  SET_PLAYLIST(state, playList) {
    state.playList = playList;
  },
  SET_SEQUENCELIST(state, sequenceList) {
    state.sequenceList = sequenceList;
  },
  SET_MODE(state, mode) {
    state.mode = mode;
  },
  SET_CURRENTINDEX(state, currentIndex) {
    state.currentIndex = currentIndex;
  },
  SET_POPULARSONGS(state, popularSongs) {
    state.popularSongs = popularSongs;
  },
  SET_TOPLIST(state, topList) {
    state.topList = topList;
  }
};
