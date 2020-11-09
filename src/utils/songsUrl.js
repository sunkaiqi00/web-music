import { commonParams, ERR_OK } from '@/api/config';
import { getUid } from './songs';
import axios from 'axios';

function genUrlMid(mids, types) {
  const guid = getUid();
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  };
}

export function getSongsUrl(songs) {
  let mids = [];
  let types = [];

  songs.forEach(song => {
    mids.push(song.mid);
    types.push(0);
  });

  const urlMid = genUrlMid(mids, types);

  const data = {
    ...commonParams,
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  };

  return new Promise((resolve, reject) => {
    let tryTime = 3;

    function request() {
      return axios
        .post('/qqsong/cgi-bin/musicu.fcg', {
          comm: data,
          req_0: urlMid
        })
        .then(response => {
          const res = response;
          if (res.code === ERR_OK) {
            let urlMid = res.req_0;
            if (urlMid && urlMid.code === ERR_OK) {
              const purlMap = {};
              urlMid.data.midurlinfo.forEach(item => {
                if (item.purl) {
                  purlMap[item.songmid] = item.purl;
                }
              });
              if (Object.keys(purlMap).length > 0) {
                resolve(purlMap);
              } else {
                retry();
              }
            } else {
              retry();
            }
          } else {
            retry();
          }
        });
    }

    function retry() {
      if (--tryTime >= 0) {
        request();
      } else {
        reject(new Error('Can not get the songs url'));
      }
    }

    request();
  });
}
