<template>
  <transition name="drop">
    <div class="dialong-wrapper" v-show="showDialong">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      showDialong: false,
    }
  },
  methods: {
    show() {
      this.showDialong = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide() {
      this.showDialong = false
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.dialong-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: $font-size-small;
  border-radius: 15px;
  z-index: 2500;
  color: #2d3436;
  background: #dfe6e9;

  &.drop-enter-active, &.drop-leave-active {
    transition: all 0.2s;
  }

  &.drop-enter, &.drop-leave-to {
    opacity: 0;
  }
}
</style>