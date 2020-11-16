function toObj(id, name) {
  return {
    id,
    name,
    avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  };
}
export { toObj };

// Math对象随机方法  随机得到两个数之间的正数  并且包含这两个数：
function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 随机打乱数组
export function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = getRandom(0, i);
    let t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

export function find_index(list, item) {
  return list.findIndex(song => song.id === item.id);
}

// 搜索节流
export function throttle(fun, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
}

export function insertArr(arr, song, fun, maxLength) {
  let fdIndex = arr.findIndex(fun);
  if (fdIndex === 0) {
    return arr;
  }
  if (fdIndex > 0) {
    arr.splice(fdIndex, 1);
  }
  arr.unshift(song);
  if (arr.length > maxLength) {
    arr.pop();
  }
  return arr;
}
