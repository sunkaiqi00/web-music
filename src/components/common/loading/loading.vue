<template>
  <div class="loading">
    <img class="loading-img" src="@/assets/image/loading-two.gif" />
    <p class="desc" v-show="titleShow">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '全力载入中...',
    },
    titleShow: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~assets/style/css/global';

.loading {
  width: 100%;
  height: 100%;
  center();

  .loading-img {
    width: 100%;
    height: 100%;
  }

  .desc {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
    font-size: $font-size-small;
    color: $text-dark;
  }
}
</style>