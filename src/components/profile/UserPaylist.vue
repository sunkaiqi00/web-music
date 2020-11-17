<template>
  <transition name="slide-right">
    <div class="user-paylist-wrapper" v-show="showUserPlayList">
      <div class="user-playlist-title">
        <div class="title">{{title}}</div>
        <span class="iconfont icon-prev" @click="hide" v-show="!editState"></span>
        <span
          class="delete"
          v-show="editState"
          @click.stop="deleteChooseSong"
          :class="{'pointer-events': pointerEvents}"
        >删除</span>
        <span
          class="editPlaylist"
          @click.stop="switchEditMode"
          v-show="playlist.length"
        >{{editText}}</span>
      </div>
      <div class="play-playlist-songs-wrapper">
        <div class="play-playlist" @click="playAll" v-show="!editState&&playlist.length">
          <span class="iconfont icon-play"></span>
          <span class="play-text">全部播放</span>
        </div>
        <div class="delete-choose-songs" v-show="editState">
          <span @click.stop="chooseAll" v-show="!isChooseAll">全选</span>
          <span @click.stop="cancelChooseAll" v-show="isChooseAll">取消全选</span>
        </div>
      </div>
      <div class="user-paylist-songs-wrapper" ref="userPlaylist">
        <scroll class="user-playlist-scroll" :data="playlist" ref="userPlaylistScroll">
          <div class="recently-play-inner">
            <song-list :songs="playlist" @onPlay="onPlay" @editPlaylist="editPlaylist"></song-list>
          </div>
        </scroll>
      </div>
      <div class="add-favorite-songs" v-show="!showNothing&&!playlist.length">
        <div class="add-wrapper" @click="addFavoriteSongs">
          <span class="iconfont icon-add"></span>
          <span class="text">添加喜欢的歌曲</span>
        </div>
      </div>
      <nothing v-show="showNothing&&!playlist.length" :style="{top:'40%'}"></nothing>
    </div>
  </transition>
</template>
<script>
import MusicList from '@/components/common/song/MusicList'
import SongList from '@/components/common/song/SongList.vue'
import scroll from '@/components/common/scroll/scroll'
import { musicMixin, userMixin } from '@/utils/mixin'
import nothing from '@/components/common/loading/nothing'
export default {
  mixins: [musicMixin, userMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    playlist: {
      type: Array,
      default: [],
    },
    showNothing: {
      type: Number,
      default: '',
    },
  },

  data() {
    return {
      showUserPlayList: false,
      isChooseAll: false,
      pointerEvents: true,
    }
  },
  components: {
    MusicList,
    SongList,
    scroll,
    nothing,
  },
  computed: {
    editText() {
      return this.editState ? '取消' : '编辑'
    },
  },
  methods: {
    addFavoriteSongs() {
      this.$router.push('/home/recommend')
      this.hide()
    },
    editPlaylist(song) {
      this.playlist.map((item) => {
        if (item.id === song.id) {
          item.editMode = !item.editMode
        }
        return item
      })
      if (this.playlist.every((item) => item.editMode === true)) {
        this.isChooseAll = true
      }
      if (this.playlist.some((item) => item.editMode !== true)) {
        this.isChooseAll = false
      }
      if (this.playlist.some((item) => item.editMode === true)) {
        this.pointerEvents = false
      } else {
        this.pointerEvents = true
      }
    },

    chooseAll() {
      this.playlist.map((item) => (item.editMode = true))
      this.isChooseAll = true
      this.pointerEvents = false
    },
    cancelChooseAll() {
      this.playlist.map((item) => (item.editMode = false))
      this.isChooseAll = false
      this.pointerEvents = true
    },
    deleteChooseSong() {
      this.$emit('deleteChooseSong')
    },
    // 开启或关闭 编辑模式
    switchEditMode() {
      this.setEditState(!this.editState)
      if (!this.editState) {
        this.playlist.map((item) => {
          item.editMode = false
          return item
        })
      }
      this.isChooseAll = false
    },
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

    .delete {
      position: absolute;
      left: 0;
      width: 60px;
      height: 100%;
      font-size: $font-size-medium;
      center();
    }

    .pointer-events {
      pointer-events: none;
      opacity: 0.6;
    }

    .editPlaylist {
      position: absolute;
      right: 0;
      width: 60px;
      height: 100%;
      center();
      font-size: $font-size-medium;
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

    .delete-choose-songs {
      position: absolute;
      right: 0;
      width: 60px;
      height: 100%;
      center();
      font-size: $font-size-small;
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

  .add-favorite-songs {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);

    .add-wrapper {
      padding: 3px 10px;
      border: 1px solid gray;
      border-radius: 20px;

      .icon-add {
        font-size: $font-size-medium;
        color: $text-gray;
      }

      .text {
        font-size: $font-size-small;
        color: $text-gray;
      }
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