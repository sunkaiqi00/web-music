<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~assets/style/css/global';

.tab {
  display: flex;
  height: 44px;
  font-size: 16px;

  .tab-item {
    flex: 1;
    center();

    .tab-link {
      color: $text-gray;
      font-weight: 300;
      transition: all 0.1s;
    }

    &.router-link-active {
      .tab-link {
        color: $text-dark;
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
}
</style>