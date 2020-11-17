<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showToast">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{title}}</p>
          <div class="operate">
            <div class="operate-btn cancel" @click.stop="cancel">{{cancelBtnText}}</div>
            <div class="operate-btn" @click.stop="confirm">{{confirmBtnText}}</div>
          </div>
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
    confirmBtnText: {
      type: String,
      default: '确定',
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
  },
  data() {
    return {
      showToast: false,
    }
  },
  methods: {
    cancel() {
      this.hide()
      this.$emit('cancel')
    },
    confirm() {
      this.hide()
      this.$emit('confirm')
    },
    show() {
      this.showToast = true
    },
    hide() {
      this.showToast = false
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1998;
  background-color: $color-background-d;

  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;

    .confirm-content {
      animation: confirm-zoom 0.3s;
    }
  }

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .confirm-content {
      width: 200px;
      border-radius: 13px;
      background: #fff;

      .text {
        padding: 20px 15px;
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $text-dark;
      }

      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-small;

        .operate-btn {
          flex: 1;
          line-height: 16px;
          padding: 10px 0;
          border-top: 1px solid #bdc3c7;
          color: $text-dark;
          box-sizing: border-box;
          letter-spacing: 2px;

          &.cancel {
            border-right: 1px solid #bdc3c7;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>