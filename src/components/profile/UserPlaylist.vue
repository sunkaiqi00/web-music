<template>
  <div class="user-playlist-wrapper">
    <div class="playlist-item" v-for="(item,index) in play_list" :key="index">
      <div class="playlist-img">
        <img :src="image(item)" alt class="img" v-show="get_playlist_length(item)" />
      </div>
      <div class="playlist-title">
        <span class="playlist-name">{{get_playlist_name(item,index)}}</span>
        <span class="playlist-length">{{get_playlist_length(item)+'首'}}</span>
      </div>
      <div class="edit-playlist">
        <span class="iconfont icon-more" @click.stop="remove_playlist(index)"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    play_list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {}
  },
  methods: {
    image(item) {
      return item[this.get_playlist_name(item)].length
        ? item[this.get_playlist_name(item)][0].image
        : ''
    },
    remove_playlist(index) {
      this.$emit('remove_playlist', index)
    },
    get_playlist_name(item) {
      return Object.keys(item)[0]
    },
    get_playlist_length(item) {
      let key = this.get_playlist_name(item)
      return item[key].length
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.user-playlist-wrapper {
  margin-top: 10px;

  .playlist-item {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-top: 10px;

    .playlist-img {
      flex: 0 0 50px;
      height: 100%;
      background: #dfe6e9;
      border-radius: 8px;
      overflow: hidden;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .playlist-title {
      height: 100%;
      flex: 0 0 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;

      .playlist-name {
        margin-bottom: 8px;
        font-size: 14px;
        no-wrap();
      }

      .playlist-length {
        font-size: 10px;
        color: gray;
      }
    }

    .edit-playlist {
      position: absolute;
      right: 0;

      .icon-more {
        font-size: 18px;
        color: gray;
      }
    }
  }
}
</style>