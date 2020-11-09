<template>
  <div class="song-list">
    <ul>
      <li v-for="item in songs" :key="item.id" class="item">
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{item.singer + ' - ' + item.album}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array,
      default: null,
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;

      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
      }

      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }

    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        no-wrap();
        color: $text-dark;
      }

      .desc {
        no-wrap();
        margin-top: 4px;
        color: $text-dark;
        font-size: 12px;
        color: $text-gray;
      }
    }
  }
}
</style>