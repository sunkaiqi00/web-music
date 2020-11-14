export default {
  setSearchHistory({ commit }, searchHistory) {
    return commit('SET_SEARCH_HISTORY', searchHistory);
  }
};
