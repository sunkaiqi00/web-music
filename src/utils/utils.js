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

export function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = getRandom(0, i);
    let t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

// 深拷贝
export function copy(data) {
  let res;
  if (getType(data) === 'Object') {
    res = {};
  } else if (getType(data) === 'Array') {
    res = [];
  } else {
    return data;
  }
  for (const [key, val] of Object.entries(data)) {
    res[key] = typeof val == 'object' ? copy(val) : val;
  }
  return res;
}

export function find_index(list, item) {
  return list.findIndex(song => song.id === item.id);
}
