<template>
  <div class="nothing">{{desc}}</div>
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

.nothing {
  text-align: center;
  color: $text-gray;
  letter-spacing: 2px;
  font-size: 12px;
}
</style>