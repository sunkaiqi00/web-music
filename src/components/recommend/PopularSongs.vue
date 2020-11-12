<template>
  <transition name="slide-right">
    <music-list :title="title" :bgImage="paylistImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import MusicList from '@/components/common/song/MusicList'
import { singerMixin } from '@/utils/mixin'
import { getPopularSong } from '@/api/request'
import { ERR_OK } from '@/api/config'
import { createSong, isValidMusic, processSongsUrl } from '@/api/songs'
export default {
  mixins: [singerMixin],
  components: {
    MusicList,
  },
  data() {
    return {
      songs: null,
    }
  },
  computed: {
    title() {
      return this.popularSongs.dissname
    },
    paylistImage() {
      return this.popularSongs.imgurl
    },
  },
  methods: {
    async get_populaySongs() {
      let data = await getPopularSong(this.popularSongs.dissid)

      if (data.code === ERR_OK) {
        processSongsUrl(this.normalize(data.cdlist[0].songlist)).then(
          (songs) => {
            this.songs = songs
          }
        )
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
      if (to.path === '/home/recommend') {
        this.songs = null
      }
    },
  },
  mounted() {
    if (!this.popularSongs.id) {
      this.$router.push('/home/recommend')
    }
    this.get_populaySongs()
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