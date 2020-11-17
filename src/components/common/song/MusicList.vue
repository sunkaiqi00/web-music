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
      <div class="filter" :class="{'opacity':isOpacity}"></div>
      <div class="play-wrapper" v-show="songs&&!isChangeHeight" ref="playControl">
        <div class="play" @click="randomPlay">
          <span class="iconfont icon-play"></span>
          <span class="text">随机播放</span>
        </div>
      </div>
    </div>
    <div class="edit-wrapper" v-show="isEdit">
      <div class="edit-title">
        <div
          class="add-to-playlist"
          :class="{'pointorEvents':!selectorLength}"
          @click="showAddPopup"
        >添加到歌单</div>
        <div class="edit-mode" @click.stop="switchEditMode">{{editText}}</div>
      </div>
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
        <song-list
          :rank="rank"
          :songs="songs"
          @onPlay="onPlay"
          :number="number"
          @editPlaylist="editPlaylist"
        ></song-list>
      </div>
    </scroll>
    <add-popup
      ref="addPopup"
      :_user_playlist="user_playList"
      @add_this_playlist="add_this_playlist"
    ></add-popup>
    <loading v-if="!songs" class="loading"></loading>
  </div>
</template>
<script>
import scroll from '@/components/common/scroll/scroll'
import loading from '@/components/common/loading/loading'
import SongList from './SongList'
import AddPopup from './AddPopup'
import { musicMixin, userMixin } from '@/utils/mixin'
import { saveUserPlayList } from '@/utils/localStorage'
export default {
  mixins: [musicMixin, userMixin],
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
    rank: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      listenScroll: true, // 监听滚动
      scrollY: 0,
      isOpacity: false, // 模糊
      // 列表滚动到距离顶部60px 取消图片的padding-top 设置固定高度 提高z-index盖住上滑的列表
      isChangeHeight: false,
      isEdit: false,
    }
  },
  components: {
    scroll,
    SongList,
    loading,
    AddPopup,
  },
  computed: {
    editText() {
      return this.editState ? '取消' : '编辑'
    },
    selectorLength() {
      return this.selectSongs.length > 0
    },
  },
  methods: {
    get_playlist_name(item) {
      return Object.keys(item)[0]
    },
    add_this_playlist(playlist) {
      let _index = this.user_playList.findIndex((item) => {
        return this.get_playlist_name(item) === this.get_playlist_name(playlist)
      })
      let arr = this.user_playList
        .slice(0)
        .filter((item, index) => index !== _index)
      this.selectSongs.map((item) => {
        playlist[this.get_playlist_name(playlist)].push(item)
      })
      let res = [...arr, playlist]
      this.setUserPlayList(res)
      saveUserPlayList(res)
      this.setEditState(false)
      this.clearSelectSongs()
    },
    showAddPopup() {
      this.$refs.addPopup.show()
    },
    // 判断歌曲是都选中状态 选中的添加到select数组
    editPlaylist(song) {
      song.editMode = !song.editMode
      let arr = this.selectSongs
      if (song.editMode) {
        arr.push(song)
      } else {
        arr = arr.filter((item) => item.id !== song.id)
      }
      this.setSelectSongs(arr)
    },
    switchEditMode() {
      this.setEditState(!this.editState)
      this.clearSelectSongs()
    },
    clearSelectSongs() {
      if (!this.editState) {
        this.selectSongs.map((item) => (item.editMode = false))
      }
      this.setSelectSongs([])
    },

    randomPlay() {
      this.RandomPlat(this.songs)
    },
    onPlay(item, index) {
      // 向 vuex 初始化 歌曲列表
      this.initPlaySong(this.songs, index)
    },
    onScroll(location) {
      this.scrollY = location.y
    },
    back() {
      this.isChangeHeight = false
      this.scrollY = 0
      this.isOpacity = false
      this.isEdit = false
      if (!this.isChangeHeight) {
        this.$router.go(-1)
      }
    },
    handlePlayList(playList) {
      let bottom = playList.length > 0 ? '60px' : ''
      this.$refs.songList.$el.style.bottom = bottom
      this.$refs.songList.refresh()
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
        // 向上滑动到了最大位置 修改图片样式
        this.isChangeHeight = true
        this.isEdit = true
      } else if (newScrollY >= 0) {
        // 禁止向下移动
        this.$refs.layer.style.top = '0'
        // t添加透明度
        this.isOpacity = false
        scale += percent
        // 在原本位置继续下滑 对图片放大处理
        this.$refs.singerImage.style.transform = `scale(${scale})`
        this.$refs.singerImage.style.zIndex = `10`
        return
      } else {
        this.$refs.singerImage.style.zIndex = ''
        // 下滑到原本位置过程 修改图片原本样式
        this.isChangeHeight = false
        this.isOpacity = true
        this.isEdit = false
        this.setEditState(false)
        this.clearSelectSongs()
      }
      this.$refs.layer.style.top = `${newScrollY}px`
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.edit-wrapper {
  position: fixed;
  top: 55px;
  z-index: 300;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px 10px 0 0;

  .edit-title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .add-to-playlist {
      font-size: 13px;
    }

    .pointorEvents {
      pointer-events: none;
      opacity: 0.5;
    }

    .edit-mode {
      font-size: 13px;
    }
  }
}

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
    z-index: 50;
    width: 60px;
    height: 60px;
    center();

    .icon-back {
      font-size: $font-size-large;
      color: $text-light;
      margin-left: -10px;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 40;
    width: 60%;
    height: 60px;
    transform: translateX(-50%);
    no-wrap();
    line-height: 60px;
    text-align: center;
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
      z-index: 10;
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
      opacity: 0.3;
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
    border-radius: 10px;
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
  width: 130px;
  height: 100px;
  transform: translateX(-50%);
}
</style>