export default {
  setSearchHistory({ commit }, searchHistory) {
    return commit('SET_SEARCH_HISTORY', searchHistory);
  },
  setPlayHistory({ commit }, playHistory) {
    return commit('SET_PLAYHISTORY', playHistory);
  }
};
