<template>
  <div class="singer">
    <view-list :data="singerList"></view-list>
  </div>
</template>
<script>
const HOT_LIST_LENGTH = 10
const HOT_TITLE = '热门'
import { singer } from '@/api/request'
import { ERR_OK } from '@/api/config'
import { toObj } from '@/utils/utils'
import ViewList from '@/components/common/viewList/ViewList'
export default {
  data() {
    return {
      singerList: null,
    }
  },
  components: {
    ViewList,
  },
  methods: {
    // 分类 排序 降维(1维)
    processing(data) {
      let map = {
        hotList: {
          title: HOT_TITLE,
          list: [],
        },
      }
      data.forEach((item, index) => {
        if (index < HOT_LIST_LENGTH) {
          map.hotList.list.push(toObj(item.Fsinger_mid, item.Fsinger_name))
        }
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            list: [],
          }
        }
        map[key].list.push(toObj(item.Fsinger_mid, item.Fsinger_name))
      })
      console.log()
      // 有序列表
      let _hot = [],
        _singer = []
      Object.values(map).forEach((item) => {
        if (item.title.match(/[a-zA-Z]/)) {
          _singer.push(item)
        } else if (item.title === HOT_TITLE) {
          _hot.push(item)
        }
      })
      // 按字母排序
      _singer.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return _hot.concat(_singer)
    },
    // 歌手数据
    async getSinger() {
      let { code, data } = await singer()
      if (code === ERR_OK) {
        this.singerList = this.processing(data.list)
      }
    },
  },
  created() {
    this.getSinger()
  },
}
</script>
<style scoped lang='stylus'>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  z-index: 400;
}
</style>