export default {
  SET_SEARCH_HISTORY(state, searchHistory) {
    state.searchHistory = searchHistory;
  },
  SET_PLAYHISTORY(state, playHistory) {
    state.playHistory = playHistory;
  },
  SET_FAVORITESONGS(state, favoriteSongs) {
    state.favoriteSongs = favoriteSongs;
  },
  SET_EDITSTATE(state, editState) {
    state.editState = editState;
  },
  SET_USER_PLAYLIST(state, user_playList) {
    state.user_playList = user_playList;
  },
  SET_SELECTSONGS(state, selectSongs) {
    state.selectSongs = selectSongs;
  }
};
