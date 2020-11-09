<template>
  <div id="app">
    <keep-alive>
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view />
      <!-- </transition> -->
    </keep-alive>
  </div>
</template>
<script>
export default {
  // computed: {
  //   key() {
  //     return this.$route.path.replace('///g', '~')
  //   },
  // },
}
</script>
<style lang="stylus">
#app {
  width: 100vw;
  height: 100vh;
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
