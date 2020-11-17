import Storage from 'web-storage-cache';
import { SEARCHHISTORY, PLAYHISTORY, FAVORITESONGS, PLAYDETAIL, USERPLAYLIST } from './const';
const localStorage = new Storage();

export function setLocalStorage(key, value) {
  return localStorage.set(key, value);
}
export function getLocalStorage(key) {
  return localStorage.get(key);
}
export function removeLocalStorage(key) {
  return localStorage.delete(key);
}

export function clearLocalStorage() {
  return localStorage.clear();
}

// 存储
function setUserInfo(key, value) {
  let userInfo = getLocalStorage(key);
  if (!userInfo) {
    userInfo = {};
  }
  userInfo[key] = value;
  setLocalStorage(key, userInfo);
}

// 获取
function getUserInfo(key) {
  let userInfo = getLocalStorage(key);
  if (userInfo) {
    return userInfo[key];
  } else {
    return null;
  }
}

// 保存搜索历史
export function saveSearchHistory(history) {
  return setUserInfo(SEARCHHISTORY, history);
}
// 获取搜索历史
export function getSearchHistory() {
  return getUserInfo(SEARCHHISTORY);
}

// 储存播放历史
export function savePlayHistory(playList) {
  return setUserInfo(PLAYHISTORY, playList);
}
// 获取播放历史
export function getPlayHistory() {
  return getUserInfo(PLAYHISTORY);
}
// 存储喜欢歌单
export function saveFavoriteSongs(favoriteSongs) {
  return setUserInfo(FAVORITESONGS, favoriteSongs);
}
// 获取喜欢歌单
export function getFavoriteSongs() {
  return getUserInfo(FAVORITESONGS);
}

export function savePlayDetail(data) {
  return setUserInfo(PLAYDETAIL, data);
}

export function getPlayDetail() {
  return getUserInfo(PLAYDETAIL);
}

export function saveUserPlayList(data) {
  return setUserInfo(USERPLAYLIST, data);
}

export function getUserPlayList() {
  return getUserInfo(USERPLAYLIST);
}
