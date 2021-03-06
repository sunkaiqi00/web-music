export default {
  setSinger({ commit }, singer) {
    return commit('SET_SINGER', singer);
  },
  setPlay({ commit }, play) {
    return commit('SET_PLAY', play);
  },
  setPlayTime({ commit }, playTime) {
    return commit('SET_PLAYTIME', playTime);
  },
  setFullScreen({ commit }, fullScreen) {
    return commit('SET_FULLSCREEN', fullScreen);
  },
  setPlayList({ commit }, playList) {
    return commit('SET_PLAYLIST', playList);
  },
  setSequenceList({ commit }, sequenceList) {
    return commit('SET_SEQUENCELIST', sequenceList);
  },
  setMode({ commit }, mode) {
    return commit('SET_MODE', mode);
  },
  setCurrentIndex({ commit }, currentIndex) {
    return commit('SET_CURRENTINDEX', currentIndex);
  },
  setPopularSongs({ commit }, popularSongs) {
    return commit('SET_POPULARSONGS', popularSongs);
  },
  setTopList({ commit }, topList) {
    return commit('SET_TOPLIST', topList);
  },
  setPlayHistory({ commit }, playHistory) {
    return commit('SET_PLAYHISTORY', playHistory);
  }
};
