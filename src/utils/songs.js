import { getSongsUrl } from './songsUrl';

//处理数据
export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.filename = `C400${this.mid}.m4a`;
    this.url = url;
  }
}
export function createSong(musicData) {
  return new Song({
    id: musicData.songid, //获取id
    mid: musicData.songmid, //获取mid
    singer: filterSinger(musicData.singer),
    name: musicData.songname, //获取名称
    album: musicData.albumname,
    duration: musicData.interval, //执行的描述
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.url
  });
}
function filterSinger(singer) {
  let ret = []; //定义空数组
  if (!singer) {
    //判断singer是否为真，如果真的就返回空字符串
    return '';
  }
  //遍历singer，进行接收
  singer.forEach(item => {
    ret.push(item.name);
  });
  return ret.join('/'); //将接收的转换成/字符串
}

export function isValidMusic(musicData) {
  return (
    musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
  );
}

//对歌曲列表进行处理
export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs);
  }
  return getSongsUrl(songs).then(purlMap => {
    songs = songs.filter(song => {
      const purl = purlMap[song.mid];
      if (purl) {
        song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl;
        return true;
      }
      return false;
    });
    return songs;
  });
}

let _uid = '';
export function getUid() {
  if (_uid) return _uid;
  if (!_uid) {
    let t = new Date().getUTCMilliseconds();
    _uid = '' + ((Math.round(2147483647 * Math.random()) * t) % 1e10);
  }
  return _uid;
}
