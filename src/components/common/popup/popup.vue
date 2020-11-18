<template>
  <transition name="scale">
    <div class="popup-wrapper" v-show="showPopup" @click.stop="hide">
      <div class="popup-content-wrapper" @click.stop>
        <div class="popup-title">新建歌单</div>
        <div class="popup-input-wrapper">
          <input class="input" v-model.trim="playlistName" type="text" placeholder="请输入歌单标题" />
          <span class="iconfont icon-delete" @click.stop="clearName"></span>
        </div>
        <div class="popup-control">
          <div class="cancel" @click="cancelBtn">取消</div>
          <div class="confirm" :class="{'pointorEvents':!pointorEvents}" @click.stop="submit">提交</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showPopup: false,
      playlistName: '',
    }
  },
  computed: {
    pointorEvents() {
      return this.playlistName.length > 0
    },
  },
  methods: {
    submit() {
      this.$emit('submit_playList', this.playlistName)
      this.hide()
      this.playlistName = ''
    },
    cancelBtn() {
      this.hide()
    },
    clearName() {
      this.playlistName = ''
    },
    show() {
      this.showPopup = true
    },
    hide() {
      this.showPopup = false
      this.playlistName = ''
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

    .popup-title {
      font-weight: 600;
      letter-spacing: 1px;
      font-size: 16px;
    }

    .popup-input-wrapper {
      position: relative;
      height: 30px;
      margin: 30px 0;

      .icon-delete {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: gray;
      }

      .input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        border-bottom: 1px solid #95a5a6;
        font-size: 14px;

        &::placeholder {
          font-size: 12px;
          color: #95a5a6;
        }
      }
    }

    .popup-control {
      display: flex;
      justify-content: flex-end;
      color: red;

      .cancel {
        font-size: 14px;
        margin-right: 40px;
      }

      .confirm {
        font-size: 14px;
      }

      .pointorEvents {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
}
</style>