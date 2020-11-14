import Storage from 'web-storage-cache';
import { SEARCHHISTORY } from './const';
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
  return new Promise((resolve, reject) => {
    let data = getLocalStorage(`qq-${qq}`);
    let code = delete data[key];
    setLocalStorage(`qq-${qq}`, data);
    if (code) {
      resolve(0);
    } else {
      reject(1);
    }
  });
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
