<template>
  <div class="song-list">
    <ul>
      <li v-for="(item,index) in songs" :key="item.id" class="item" @click="onPlay(item,index)">
        <div class="content">
          <h2 class="name">
            <div>{{index+1}}.</div>
            <div class="singer-name">{{item.name}}</div>
          </h2>
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
  methods: {
    onPlay(item, index) {
      this.$emit('onPlay', item, index)
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
        display: flex;
        color: $text-dark;

        .singer-name {
          margin-left: 2px;
        }
      }

      .desc {
        no-wrap();
        margin: 4px 0 0 12px;
        // margin-top: 4px;
        font-size: 12px;
        color: $text-gray;
      }
    }
  }
}
</style>