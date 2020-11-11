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
export default {
  components: {
    MusicPlayer,
  },
}
</script>
<style lang="stylus">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
