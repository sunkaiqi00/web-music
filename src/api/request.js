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
