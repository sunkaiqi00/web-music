<template>
  <div id="app">
    <music-player></music-player>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import MusicPlayer from '@/components/common/player/MusicPlayer'
import {
  getSearchHistory,
  getPlayHistory,
  getFavoriteSongs,
} from '@/utils/localStorage'
import { userMixin } from '@/utils/mixin'
export default {
  mixins: [userMixin],
  components: {
    MusicPlayer,
  },
  mounted() {
    let seach_history = getSearchHistory(this.qq_num)
      ? getSearchHistory(this.qq_num)
      : []
    this.setSearchHistory(seach_history)
    let play_history = getPlayHistory(this.qq_num)
      ? getPlayHistory(this.qq_num)
      : []
    this.setPlayHistory(play_history)
    let favorite_songs = getFavoriteSongs(this.qq_num)
      ? getFavoriteSongs(this.qq_num)
      : []
    this.setFavoriteSongs(favorite_songs)
  },
}
</script>
<style lang="stylus">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
