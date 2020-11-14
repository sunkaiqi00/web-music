<template>
  <div class="profile">
    <div class="search-wrapper">
      <div class="search-box" @click="goSearchPage">
        <span class="iconfont icon-search"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goSearchPage() {
      this.$router.push('/search')
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.profile {
  position: absolute;
  top: 88px;
  bottom: 0;
  width: 100%;

  .search-wrapper {
    width: 100%;
    height: 25px;
    padding: 10px 0;

    .search-box {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      background: #ecf0f1;
      border-radius: 20px;

      .icon-search {
        display: inline-block;
        font-size: 16px;
        width: 40px;
        height: 100%;
        center();
      }
    }
  }
}
</style>