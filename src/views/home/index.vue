<template>
  <div class="home">
    <div class="header-tab-wrapper">
      <header-nav></header-nav>
      <router-tab></router-tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import HeaderNav from '@/components/home/HeaderNav'
import RouterTab from '@/components/tab/RouterTab'
export default {
  components: {
    HeaderNav,
    RouterTab,
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/css/global';
</style>