<template>
  <div class="nothing-wrapper">
    <div class="nothing-img">
      <img src="@/assets/image/nothing.png" alt />
    </div>
    <div class="nothing-text">{{desc}}</div>
  </div>
</template>
<script>
export default {
  props: {
    desc: {
      type: String,
      default: '这里什么都没有...',
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.nothing-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 137px;
  height: 110px;

  .nothing-img {
    width: 100%;

    img {
      width: 100%;
    }
  }

  .nothing-text {
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    text-align: center;
    color: $text-gray;
    letter-spacing: 2px;
    font-size: 12px;
  }
}
</style>