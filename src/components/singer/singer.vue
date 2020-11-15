<template>
  <div class="singer" ref="singer">
    <view-list :data="singerList" ref="singerList"></view-list>
    <div class="loading-container" v-if="!singerList">
      <loading />
    </div>
  </div>
</template>
<script>
const HOT_LIST_LENGTH = 10
const HOT_TITLE = '热门'
import { singer } from '@/api/request'
import { ERR_OK } from '@/api/config'
import { toObj } from '@/utils/utils'
import { musicMixin } from '@/utils/mixin'
import ViewList from '@/components/common/viewList/ViewList'
import loading from '@/components/common/loading/loading'
export default {
  mixins: [musicMixin],
  data() {
    return {
      singerList: null,
    }
  },
  components: {
    ViewList,
    loading,
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
    handlePlayList(playList) {
      let bottom = playList.length > 0 ? '16vw' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.singerList.refresh()
    },
  },
  created() {
    this.getSinger()
  },
}
</script>
<style scoped lang='stylus'>
.singer {
  position: absolute;
  top: 88px;
  bottom: 0;
  width: 100%;
  z-index: 400;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
    width: 0;
  }

  .loading-container {
    position: fixed;
    width: 130px;
    height: 100px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 600;
  }
}

.fade-bottom-enter-active, .fade-bottom-leave-active {
  transition: all 1s;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>