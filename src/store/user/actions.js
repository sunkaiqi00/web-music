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
  }
};
