<template>
  <transition name="slide-right">
    <div class="user-paylist-wrapper" v-show="showUserPlayList">
      <div class="user-playlist-title">
        <div class="title">{{title}}</div>
        <span class="iconfont icon-prev" @click="hide"></span>
      </div>
      <div class="play-playlist-songs-wrapper" v-show="songs&&songs.length">
        <div class="play-playlist" @click="playAll">
          <span class="iconfont icon-play"></span>
          <span class="play-text">全部播放</span>
        </div>
      </div>
      <div class="user-paylist-songs-wrapper" ref="userPlaylist">
        <scroll class="user-playlist-scroll" ref="userPlaylistScroll">
          <div class="recently-play-inner">
            <song-list @onPlay="onPlay" :songs="songs"></song-list>
          </div>
        </scroll>
      </div>
      <nothing :style="{top:'40%'}" v-show="songs&&!songs.length"></nothing>
    </div>
  </transition>
</template>
<script>
import MusicList from '@/components/common/song/MusicList'
import SongList from '@/components/common/song/SongList.vue'
import scroll from '@/components/common/scroll/scroll'
import nothing from '@/components/common/loading/nothing'
import { userMixin, musicMixin } from '@/utils/mixin'
export default {
  mixins: [userMixin, musicMixin],
  props: {
    user_play_list: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      showUserPlayList: false,
      showControl: false,
    }
  },
  components: {
    MusicList,
    SongList,
    scroll,
    nothing,
  },
  computed: {
    title() {
      return Object.keys(this.user_play_list)[0]
    },
    songs() {
      return Object.values(this.user_play_list)[0]
    },
  },
  methods: {
    playAll() {
      this.playList_All(this.songs)
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
      if (this.$refs.userPlaylist) {
        this.$refs.userPlaylist.style.bottom = bottom
      }
      this.$refs.userPlaylistScroll && this.$refs.userPlaylistScroll.refresh()
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
    position: relative;
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