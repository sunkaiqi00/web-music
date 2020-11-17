export default {
  setSearchHistory({ commit }, searchHistory) {
    return commit('SET_SEARCH_HISTORY', searchHistory);
  },
  setPlayHistory({ commit }, playHistory) {
    return commit('SET_PLAYHISTORY', playHistory);
  },
  setFavoriteSongs({ commit }, favoriteSongs) {
    return commit('SET_FAVORITESONGS', favoriteSongs);
  },
  setEditState({ commit }, editState) {
    return commit('SET_EDITSTATE', editState);
  },
  setUserPlayList({ commit }, user_playList) {
    return commit('SET_USER_PLAYLIST', user_playList);
  },
  setSelectSongs({ commit }, selectSongs) {
    return commit('SET_SELECTSONGS', selectSongs);
  }
};
