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
  savePlayDetail,
  getPlayDetail,
  getUserPlayList,
} from '@/utils/localStorage'
import Song from '@/api/songs'
import { userMixin, musicMixin } from '@/utils/mixin'
export default {
  mixins: [userMixin, musicMixin],
  components: {
    MusicPlayer,
  },
  methods: {
    initdata() {
      let seach_history = getSearchHistory() ? getSearchHistory() : []
      this.setSearchHistory(seach_history)
      let play_history = getPlayHistory() ? getPlayHistory() : []
      this.setPlayHistory(play_history)
      let favorite_songs = getFavoriteSongs() ? getFavoriteSongs() : []
      this.setFavoriteSongs(favorite_songs)
      let user_playList = getUserPlayList() ? getUserPlayList() : []
      this.setUserPlayList(user_playList)
    },
    saveUserPlayDetail() {
      let THIS = this

      window.onbeforeunload = function (e) {
        if (!THIS.playList.length && !THIS.sequenceList.length) return
        let list = {
          current_index: THIS.currentIndex,
          mode: THIS.mode,
          play_list: THIS.playList,
          play_time: THIS.playTime,
          sequence_list: THIS.sequenceList,
        }
        savePlayDetail(list)
      }
    },
  },
  mounted() {
    this.initdata()
    this.saveUserPlayDetail()
  },
  created() {
    let detail = getPlayDetail()
    if (!detail) return
    this.setCurrentIndex(detail.current_index)
    this.setMode(detail.mode)
    this.setPlayList(detail.play_list.map((item) => new Song(item)))
    this.setSequenceList(detail.sequence_list.map((item) => new Song(item)))
    this.setPlayTime(detail.play_time)
  },
}
</script>
<style lang="stylus">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
