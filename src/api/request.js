import axios from 'axios';
import { commonParams } from './config';
const debug = process.env.NODE_ENV !== 'production';
axios.defaults.timeout = 6000;

axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    throw new Error(err);
  }
);
axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    throw new Error(err);
  }
);

// 首页banner
export function banner() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
        params: {
          platform: 'h5',
          uin: 0,
          needNewCode: 1,
          g_tk: 5381,
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          ...commonParams
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 首页推荐
export function discList() {
  return new Promise((resolve, reject) => {
    axios
      .get('api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
        params: {
          platform: 'yqq',
          hostUin: 0,
          sin: 0,
          ein: 29,
          sortId: 5,
          needNewCode: 0,
          categoryId: 10000000,
          rnd: Math.random(),
          ...commonParams,
          format: 'json'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 歌手
export function singer() {
  return new Promise((resolve, reject) => {
    axios
      .get('api/v8/fcg-bin/v8.fcg', {
        params: {
          ...commonParams,
          channel: 'singer',
          page: 'list',
          key: 'all_all_all',
          pagesize: 100,
          pagenum: 1,
          hostUin: 0,
          needNewCode: 0,
          platform: 'yqq'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 歌手详情
export function getSingerDetail(parameter) {
  return new Promise((resolve, reject) => {
    axios
      .get('api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
        params: {
          ...commonParams,
          platform: 'yqq',
          order: 'listen',
          begin: 0,
          num: parameter.num,
          needNewCode: 0,
          songstatus: 0,
          g_tk: 1664029744,
          singermid: parameter.id
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 歌词
export function getLyric(mid) {
  return new Promise((resolve, reject) => {
    axios
      .get('api/lyric/fcgi-bin/fcg_query_lyric_new.fcg', {
        params: {
          ...commonParams,
          platform: 'yqq',
          g_tk: 67232076,
          songmid: mid,
          pcachetime: +new Date(),
          hostUin: 0,
          needNewCode: 0,
          format: 'json'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 热门歌单
export function getPopularSong(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', {
        params: {
          ...commonParams,
          type: 1,
          json: 1,
          utf8: 1,
          onlysong: 0,
          platform: 'yqq',
          g_tk: 67232076,
          disstid: id,
          hostUin: 0,
          needNewCode: 0,
          format: 'json'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 排行榜单
export function getTopList() {
  return new Promise((resolve, reject) => {
    axios
      .get('api/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        params: {
          ...commonParams,
          platform: 'h5',
          needNewCode: 1,
          format: 'json'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 排行榜单详细歌单
export function getTopMusicList(topid) {
  return new Promise((resolve, reject) => {
    axios
      .get('api/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          ...commonParams,
          topid,
          platform: 'h5',
          needNewCode: 1,
          tpl: 3,
          type: 'top',
          page: 'detail',
          format: 'json'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 热门搜索
export function getHotKey() {
  return new Promise((resolve, reject) => {
    axios
      .get('api/splcloud/fcgi-bin/gethotkey.fcg', {
        params: {
          ...commonParams,
          platform: 'h5',
          needNewCode: 1,
          // g_tk:1928093487,
          format: 'json'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 关键词检索   keywords 关键词   page 检索几页  zhida 搜索歌手时为1 列表显示当前歌手  perpage 一次请求多少数据
export function searchKeywords(keywords, page, zhida, perpage) {
  return new Promise((resolve, reject) => {
    axios
      .get('api/soso/fcgi-bin/search_for_qq_cp', {
        params: {
          ...commonParams,
          w: keywords,
          p: page,
          catZhida: zhida ? 1 : 0,
          zhidaqu: 1,
          t: 0,
          flag: 1,
          ie: 'utf-8',
          sem: 1,
          aggr: 0,
          perpage,
          n: perpage,
          remoteplace: 'txt.mqq.all',
          uid: 0,
          platform: 'h5',
          needNewCode: 1,
          format: 'json'
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
