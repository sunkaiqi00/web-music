<template>
  <transition name="slide-right">
    <music-list :rank="true" :title="title" :bgImage="topListImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import MusicList from '@/components/common/song/MusicList'
import { singerMixin } from '@/utils/mixin'
import { getTopMusicList } from '@/api/request'
import { ERR_OK } from '@/api/config'
import { createSong, isValidMusic, processSongsUrl } from '@/api/songs'
export default {
  mixins: [singerMixin],
  data() {
    return {
      songs: null,
    }
  },
  components: {
    MusicList,
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    topListImage() {
      return this.songs && this.songs[0].image
    },
  },
  methods: {
    findData(list) {
      let res = []
      list.forEach((item) => {
        res.push(item.data)
      })
      return res
    },
    async _getTopMusicList() {
      let data = await getTopMusicList(this.topList.id)
      if (data.code === ERR_OK) {
        let song_list = this.findData(data.songlist)
        processSongsUrl(this.normalize(song_list)).then((songs) => {
          this.songs = songs
        })
      }
    },
    normalize(list) {
      let res = []
      list.forEach((item) => {
        //判断songid或alummid存在的话就进行接收
        if (isValidMusic(item)) {
          res.push(createSong(item))
        }
      })
      return res
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === '/home/rank') {
        this.songs = null
      }
    },
  },
  created() {
    if (!this.topList.id) {
      this.$router.push('/home/rank')
    }
    this._getTopMusicList()
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-right-enter-to, .slide-right-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.3s;
}
</style>