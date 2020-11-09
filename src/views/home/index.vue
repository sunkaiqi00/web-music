<template>
  <div class="home">
    <div class="header-tab-wrapper" :class="{'is-shadow': isShowShadow}">
      <header-nav></header-nav>
      <router-tab></router-tab>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
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
  watch: {
    $route(to, from) {
      if (to) {
        this.setScrollOffsetY(0)
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
</style>