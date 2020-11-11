<template>
  <transition name="fade">
    <div class="singer-detail">
      <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </div>
  </transition>
</template>
<script>
import { getSingerDetail } from '@/api/request'
import { ERR_OK } from '@/api/config'
import { singerMixin } from '@/utils/mixin'
import { createSong, isValidMusic, processSongsUrl } from '@/api/songs'
import MusicList from '@/components/common/song/MusicList'
export default {
  mixins: [singerMixin],
  data() {
    return {
      songs: null, // 歌曲数组
      num: 100, // 第一次请求多少歌
    }
  },
  components: {
    MusicList,
  },
  computed: {
    title() {
      return this.singer ? this.singer.name : ''
    },
    bgImage() {
      return this.singer ? this.singer.avatar : ''
    },
  },
  methods: {
    async singerDetail() {
      // 当前页面刷新 通过路由获取id
      let parameter = {
        id: this.singer.id,
        num: this.num,
      }

      let { code, data } = await getSingerDetail(parameter)
      if (code === ERR_OK) {
        processSongsUrl(this._normalizeSongs(data.list)).then((songs) => {
          this.songs = songs
        })
      }
    },
    _normalizeSongs(list) {
      let ret = [] //定义空数组
      list.forEach((item) => {
        let { musicData } = item
        //判断songid或alummid存在的话就进行接收
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    initRequest() {
      if (!this.singer) {
        this.$router.push('/home/singer')
        return
      }
      this.singerDetail()
    },
  },
  watch: {
    singer() {
      this.initRequest()
    },
    $route(to, from) {
      if (to.path === '/home/singer') {
        this.songs = null
      }
    },
  },
  created() {
    this.initRequest()
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}

.singer-detail {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 700;
}
</style>