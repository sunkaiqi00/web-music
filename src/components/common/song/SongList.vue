<template>
  <div class="song-list">
    <ul>
      <li v-for="(item,index) in songs" :key="index" class="item">
        <div class="rank" v-show="rank">
          <span :class="getRankClass(index)">{{getRankNum(index)}}</span>
        </div>
        <div class="ranknum" v-show="number">{{index+1}}.</div>
        <div class="content" @click.stop="onPlay(item,index)">
          <div class="singer-name">{{item.name}}</div>
          <p class="desc">{{item.singer + ' - ' + item.album}}</p>
        </div>
        <div class="choose-wrapper" @click.stop="editSongs(item)" v-show="editState">
          <span class="iconfont icon-choose" v-show="item.editMode"></span>
          <span class="iconfont icon-no-choose" v-show="!item.editMode"></span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { userMixin } from '@/utils/mixin'
export default {
  mixins: [userMixin],
  props: {
    songs: {
      type: Array,
      default: null,
    },
    rank: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    editSongs(song) {
      this.$emit('editPlaylist', song)
    },
    getRankClass(index) {
      if (index <= 2) {
        return `iconfont icon-no${index + 1}`
      } else {
        return 'text'
      }
    },
    getRankNum(index) {
      if (index > 2) {
        return index + 1 + '.'
      }
    },
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
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .rank {
      flex: 0 0 40px;
      width: 40px;
      height: 100%;
      margin-right: 10px;
      text-align: center;

      .icon-no1, .icon-no2, .icon-no3 {
        font-size: 24px;
      }

      .icon-no1 {
        color: #fed430;
      }

      .icon-no2 {
        color: #e8e8e8;
      }

      .icon-no3 {
        color: #ff9800;
      }

      .text {
        color: $color-dark;
        font-size: $font-size-medium-x;
      }
    }

    .ranknum {
      flex: 0 0 25px;
      width: 25px;
      height: 100%;
      margin-right: 10px;
      text-align: center;
      color: $color-dark;
      font-size: $font-size-medium-x;
    }

    .content {
      flex: 0 0 220px;
      height: 100%;
      overflow: hidden;
      line-height: 16px;

      .singer-name {
        no-wrap();
        color: $text-dark;
        margin-left: 2px;
      }

      .desc {
        no-wrap();
        margin: 6px 0 0 0;
        font-size: 12px;
        color: $text-gray;
      }
    }

    .choose-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      padding-top: 7px;
      box-sizing: border-box;
      background: transparent;

      // right: 0;
      // top: 7px;
      .icon-choose {
        font-size: 15px;
        color: red;
        margin-right: 2px;
        margin-top: 1px;
      }

      .icon-no-choose {
        font-size: 20px;
        color: $text-gray;
      }
    }
  }
}
</style>