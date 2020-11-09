<template>
  <div class="home">
    <div class="header-tab-wrapper" :class="{'is-shadow': isShowShadow}">
      <header-nav></header-nav>
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
import HeaderNav from '@/components/home/HeaderNav'
import RouterTab from '@/components/tab/RouterTab'
import { homeMixin } from '@/utils/mixin'
export default {
  mixins: [homeMixin],
  components: {
    HeaderNav,
    RouterTab,
  },
  computed: {
    isShowShadow() {
      if (this.scrollOffsetY === 0) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.home {
  .is-shadow {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 500;
  }
}

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
</style>