import Storage from 'web-storage-cache';
import { SEARCHHISTORY, PLAYHISTORY, FAVORITESONGS } from './const';
const localStorage = new Storage();

export function setLocalStorage(key, value) {
  return localStorage.set(key, value);
}
export function getLocalStorage(key) {
  return localStorage.get(key);
}
// export function removeLocalStorage(key) {
//   return localStorage.delete(key);
// }
export function removeLocalStorage(qq, key) {
  let data = getLocalStorage(`qq-${qq}`);
  let code = delete data[key];
  setLocalStorage(`qq-${qq}`, data);
  return Promise.resolve(code);
}
export function clearLocalStorage() {
  return localStorage.clear();
}

// 存储
function setUserInfo(qq, key, value) {
  let userInfo = getLocalStorage(`qq-${qq}`);
  if (!userInfo) {
    userInfo = {};
  }
  userInfo[key] = value;
  setLocalStorage(`qq-${qq}`, userInfo);
}

// 获取
function getUserInfo(qq, key) {
  let userInfo = getLocalStorage(`qq-${qq}`);
  if (userInfo) {
    return userInfo[key];
  } else {
    return null;
  }
}

// 保存搜索历史
export function saveSearchHistory(qq, history) {
  return setUserInfo(qq, SEARCHHISTORY, history);
}
// 获取搜索历史
export function getSearchHistory(qq) {
  return getUserInfo(qq, SEARCHHISTORY);
}

// 储存播放历史
export function savePlayHistory(qq, playList) {
  return setUserInfo(qq, PLAYHISTORY, playList);
}
// 获取播放历史
export function getPlayHistory(qq) {
  return getUserInfo(qq, PLAYHISTORY);
}
// 存储喜欢歌单
export function saveFavoriteSongs(qq, favoriteSongs) {
  return setUserInfo(qq, FAVORITESONGS, favoriteSongs);
}
// 获取喜欢歌单
export function getFavoriteSongs(qq) {
  return getUserInfo(qq, FAVORITESONGS);
}
