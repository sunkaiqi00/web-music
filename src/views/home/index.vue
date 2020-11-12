<template>
  <div class="home">
    <div class="header-tab-wrapper">
      <div class="m-header">
        <h1 class="text">Kaihuai Music</h1>
      </div>
      <router-tab></router-tab>
    </div>
    <transition name="slide-up">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import RouterTab from '@/components/common/tab/RouterTab'
export default {
  components: {
    RouterTab,
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/css/global';

.slide-up-enter, .slide-up-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.slide-up-enter-to, .slide-up-leave {
  opacity: 1;
  transform: translate3d(0, 0px, 0);
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s;
}

.m-header {
  width: 100vw;
  height: 44px;
  color: $text-dark;
  center();

  .text {
    font-size: $font-size-large-x;
    font-weight: bold;
  }
}
</style>