<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showPayList" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <div class="title">
            <span class="iconfont" :class="playMode" @click="changeMode"></span>
            <span class="text">{{modeText}}</span>
            <span class="iconfont icon-add" @click.stop="showAddPage"></span>
            <span class="iconfont icon-clear" @click.stop="showToast"></span>
          </div>
        </div>
        <scroll class="list-content" ref="listContent" :refreshDelay="100">
          <transition-group name="list" tag="ul">
            <li class="item" ref="listItem" v-for="(item,index) in sequenceList" :key="item.id">
              <div
                class="text"
                :class="{'current-song':currentItem(item)}"
                @click="disPlaySong(item,index)"
              >
                <span class="current-icon" :class="currentIcon(item)"></span>
                <span class="song-msg">{{item.name + ' - ' + item.singer}}</span>
              </div>
              <span
                class="iconfont"
                :class="getFavoriteIcon(item)"
                @click.stop="toggalFavorite(item)"
              ></span>
              <span class="iconfont icon-delete" @click.stop="deleteOneSong(item)"></span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm-toast ref="toast" :title="title" @confirm="clearSong"></confirm-toast>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>
<script>
import { musicMixin, userMixin } from '@/utils/mixin'
import scroll from '@/components/common/scroll/scroll'
import ConfirmToast from '@/components/common/confirmToast/ConfirmToast'
import AddSong from './AddSong'
export default {
  mixins: [musicMixin, userMixin],
  data() {
    return {
      showPayList: false,
      title: '是否清空播放列表?',
    }
  },
  components: {
    scroll,
    ConfirmToast,
    AddSong,
  },
  computed: {
    modeText() {
      return this.mode === 0
        ? '顺序播放'
        : this.mode === 1
        ? '单曲循环'
        : '随机播放'
    },
  },
  methods: {
    showAddPage() {
      this.$refs.addSong.show()
    },
    showToast() {
      this.$refs.toast.show()
    },
    // 删除播放列表
    clearSong() {
      this.clearSongList()
      if (this.playList.length === 0) {
        this.hide()
      }
    },
    // 歌单列表删除一首
    deleteOneSong(item) {
      this.deleteSong(item)
      if (this.playList.length === 0) {
        this.hide()
      }
    },
    // 歌单当前播放歌曲歌单到最上面
    scrollToCurrentSong(item) {
      // console.log(item)
      let index = this.sequenceList.findIndex((song) => song.id === item.id)
      // console.log(index)
      // console.log(this.$refs.listItem[index])
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
    },
    disPlaySong(item, index) {
      // 随机播放模式
      if (this.mode === 2) {
        index = this.playList.findIndex((song) => song.id === item.id)
      }
      this.setCurrentIndex(index)
      this.setPlay(true)
    },
    // 当前播放歌 添加 icon
    currentIcon(item) {
      if (item.name === this.currentSong.name) {
        return 'iconfont icon-volume'
      }
    },
    // 当前播放 红色显示
    currentItem(item) {
      return item.id === this.currentSong.id
    },
    show() {
      this.showPayList = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrentSong(this.currentSong)
      }, 20)
    },
    hide() {
      this.showPayList = false
    },
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (this.showPayList) {
        if (newSong.id !== oldSong.id) {
          this.scrollToCurrentSong(newSong)
        }
      }
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1200;
  background-color: $color-background-d;

  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  &.list-fade-enter, .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 5px 5px 0 0;

    .list-header {
      border-bottom: 1px solid #bdc3c7;
      box-sizing: border-box;
      padding: 0 20px;
      height: 50px;
      line-height: 50px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $text-dark;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          margin-left: 8px;
          color: $text-dark;
        }

        .icon-sequence, .icon-loop, .icon-random {
          font-size: $font-size-large-x;
        }

        .icon-add {
          font-size: $font-size-large-x;
          color: $text-dark;
          margin-right: 15px;
        }

        .icon-clear {
          font-size: $font-size-large;
          color: $text-dark;
        }
      }
    }

    .list-content {
      max-height: 320px;
      min-height: 280px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 35px;
        padding: 0 20px;
        overflow: hidden;

        &.list-enter-active, &.list-leave-active {
          transition: all 0.1s;
        }

        &.list-enter, &.list-leave-to {
          opacity: 0;
          transform: translateX(10px);
        }

        .current-icon {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-medium-x;
        }

        .current-song {
          color: #EA2027;
          transition: all 0.2s;
        }

        .text {
          flex: 1;
          no-wrap();
          padding-right: 20px;
          box-sizing: border-box;
          font-weight: 300;

          .icon-volume {
            margin-right: 5px;
            font-size: $font-size-medium-x;
          }

          .song-msg {
            font-size: 13px;
          }
        }

        .icon-no-favorite, .icon-favorite {
          margin-right: 18px;
          font-size: $font-size-medium;
          color: $text-dark;
        }

        .icon-favorite {
          color: #f00;
          font-size: $font-size-large;
        }

        .icon-delete {
          margin-right: 2px;
          font-size: $font-size-medium;
          color: $text-dark;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      border-top: 1px solid #bdc3c7;
      box-sizing: border-box;
      box-sizing: border-box;
      font-size: $font-size-medium-x;
      color: $text-dark;
      letter-spacing: 5px;
    }
  }
}
</style>