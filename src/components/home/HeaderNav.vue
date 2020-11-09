<template>
  <div class="m-header">
    <h1 class="text">Kaihuai Music</h1>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus">
@import '~assets/style/css/global';

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