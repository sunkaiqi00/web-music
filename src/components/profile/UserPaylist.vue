<template>
  <transition name="slide-right">
    <div class="user-paylist-wrapper" v-show="showUserPlayList">
      <div class="user-playlist-title">
        <div class="title">{{title}}</div>
        <span class="iconfont icon-prev" @click="hide"></span>
      </div>
      <div class="play-playlist-songs-wrapper">
        <div class="play-playlist" @click="playAll">
          <span class="iconfont icon-play"></span>
          <span class="play-text">全部播放</span>
        </div>
      </div>
      <div class="user-paylist-songs-wrapper" ref="userPlaylist">
        <scroll class="user-playlist-scroll" :data="playlist" ref="userPlaylistScroll">
          <div class="recently-play-inner">
            <song-list :songs="playlist" @onPlay="onPlay"></song-list>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script>
import MusicList from '@/components/common/song/MusicList'
import SongList from '@/components/common/song/SongList.vue'
import scroll from '@/components/common/scroll/scroll'
import { musicMixin } from '@/utils/mixin'
export default {
  mixins: [musicMixin],
  props: {
    title: {
      type: String,
      default: '孙开启',
    },
    playlist: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      showUserPlayList: false,
    }
  },
  components: {
    MusicList,
    SongList,
    scroll,
  },
  methods: {
    playAll() {
      if (!this.playlist) return
      this.playList_All(this.playlist)
    },
    onPlay(item, index) {
      this.$emit('onPlay', item, index)
    },
    show() {
      this.showUserPlayList = true
    },
    hide() {
      this.showUserPlayList = false
    },
    handlePlayList(paylist) {
      let bottom = paylist.length > 0 ? '60px' : ''
      this.$refs.userPlaylist.style.bottom = bottom
      this.$refs.userPlaylistScroll.refresh()
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.user-paylist-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 700;
  background: $color-background;

  .user-playlist-title {
    position: relative;
    width: 100%;
    height: 40px;
    center();

    .title {
      font-size: $font-size-medium-x;
    }

    .icon-prev {
      position: absolute;
      left: 0;
      width: 40px;
      height: 100%;
      center();
    }
  }

  .play-playlist-songs-wrapper {
    width: 100%;
    height: 40px;
    center();

    .play-playlist {
      .icon-play {
        margin-right: 3px;
        font-size: $font-size-medium;
      }

      .play-text {
        font-size: $font-size-small;
      }
    }
  }

  .user-paylist-songs-wrapper {
    position: absolute;
    top: 80px;
    width: 100%;
    bottom: 0;

    .user-playlist-scroll {
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 10px 20px 0;
      box-sizing: border-box;
    }
  }
}

.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-right-enter-to, .slide-right-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.3s;
}
</style>