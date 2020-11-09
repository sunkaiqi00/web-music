<template>
  <div class="music-list">
    <div class="back" @click="back">
      <span class="iconfont icon-back"></span>
    </div>
    <h1 class="title">{{title}}</h1>
    <div
      class="singer-image"
      :class="{'changeHeight':isChangeHeight}"
      :style="{backgroundImage:`url('${bgImage}')`}"
      ref="singerImage"
    >
      <div class="play-wrapper" v-show="songs && !isChangeHeight">
        <div class="play">
          <span class="iconfont icon-play"></span>
          <span class="text">随机播放</span>
        </div>
      </div>
      <div class="filter" :class="{'opacity':isOpacity}"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :listenScroll="listenScroll"
      @onScroll="onScroll"
      :data="songs"
      class="song-list-scroll"
      ref="songList"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
    <loading v-show="!songs" class="loading"></loading>
  </div>
</template>
<script>
import scroll from '@/components/common/scroll/scroll'
import loading from '@/components/common/loading/loading'
import SongList from './SongList'
export default {
  props: {
    songs: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    bgImage: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      listenScroll: true, // 监听滚动
      scrollY: 0,
      isChangeHeight: false, // 图片改为固定高度 提高z-index 盖住上滑的列表
      isOpacity: false, // 模糊
    }
  },
  components: {
    scroll,
    SongList,
    loading,
  },
  methods: {
    onScroll(location) {
      this.scrollY = location.y
    },
    back() {
      this.$router.go(-1)
    },
  },
  watch: {
    songs() {
      // 图片容器的高度  计算歌曲容器 top 定位值
      this.singerImageHeight = this.$refs.singerImage.clientHeight
      this.$refs.songList.$el.style.top = `${this.$refs.singerImage.clientHeight}px`
    },
    scrollY(newScrollY) {
      let scale = 1
      let percent = Math.abs(newScrollY / this.singerImageHeight)
      // (1 + percent) * this.imageHeight === newScrollY + this.singerImageHeight
      // layer 白色板移动最大距离
      let maxScrollY = this.singerImageHeight - 60
      if (newScrollY <= -maxScrollY) {
        // 不能移动超过最大距离
        this.scrollY = -maxScrollY
        // 移动超过最大距离 改变图片容器
        this.isChangeHeight = true
      } else if (newScrollY >= 0) {
        // 禁止向下移动
        this.$refs.layer.style.top = '0'
        this.isOpacity = false
        scale += percent
        this.$refs.singerImage.style.transform = `scale(${scale})`
        this.$refs.singerImage.style.zIndex = `10`
        return
      } else {
        // 否则  归为图片容器
        this.isChangeHeight = false
        this.isOpacity = true
        this.$refs.singerImage.style.zIndex = ``
      }
      this.$refs.layer.style.top = `${newScrollY}px`
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $text-light;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $text-light;
  }

  .singer-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
    transform-origin: top;
    background-size: cover;
    transform-origin: top;

    &.changeHeight {
      padding-top: 0;
      height: 60px;
      z-index: 30;
    }

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 110px;
        padding: 5px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 1s;
    }

    .opacity {
      background: #000;
      opacity: 0.4;
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .song-list-scroll {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
}
</style>