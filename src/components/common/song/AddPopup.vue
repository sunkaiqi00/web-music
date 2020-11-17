<template>
  <transition name="scale">
    <div class="popup-wrapper" v-show="showPopup" @click.stop="hide">
      <div class="popup-content-wrapper">
        <div class="popup-title-wrapper">
          <div class="popup-title">添加到歌单</div>
          <div class="cancel" @click.stop="hide">取消</div>
        </div>
        <scroll class="user-playlist" :data="_user_playlist">
          <div class="scroll-wrapper">
            <div
              class="playlist-name"
              v-for="(item,index) in _user_playlist"
              :key="index"
              @click="add_this_playlist(item)"
            >{{get_playlist_name(item)}}</div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script>
import scroll from '@/components/common/scroll/scroll'
export default {
  props: {
    _user_playlist: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      showPopup: false,
    }
  },
  components: {
    scroll,
  },
  methods: {
    add_this_playlist(item) {
      this.$emit('add_this_playlist', item)
    },
    get_playlist_name(item) {
      return Object.keys(item)[0]
    },
    cancelBtn() {
      this.hide()
    },
    show() {
      this.showPopup = true
    },
    hide() {
      this.showPopup = false
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.scale-enter-active, .scale-leave-active {
  transition: all 0.2s;
}

.scale-enter, .scale-leave-to {
  opacity: 0;
}

.popup-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);

  .popup-content-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    background: #fff;
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    padding: 20px 15px;

    .popup-title-wrapper {
      display: flex;
      justify-content: space-between;

      .popup-title {
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 16px;
      }

      .cancel {
        font-size: 14px;
      }
    }

    .user-playlist {
      width: 100%;
      height: 140px;
      max-height: 160px;
      // overflow-x: hidden;
      overflow: auto;
      no-wrap();
      margin-top: 20px;

      .playlist-name {
        line-height: 30px;
      }
    }
  }
}
</style>