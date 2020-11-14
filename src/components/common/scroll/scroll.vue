<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 3,
    },
    click: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: null,
    },
    listenScroll: {
      // 监听滚动
      type: Boolean,
      default: false,
    },
    pullup: {
      type: Boolean,
      default: false,
    },
    beforeScroll: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    data() {
      this.refresh()
    },
  },
  methods: {
    initScroll() {
      if (this.$refs.wrapper) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
        })
      }
      // 监听滚动  向父组件派发事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (location) => {
          this.$emit('onScroll', location)
        })
      }
      // 下拉刷新  监听滚动结束时 判断滚动的距离和最大滚动距离
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }
      // 滚动前事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('before_Scroll')
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // console.log(1)
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
  },
  mounted() {
    this.initScroll()
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';
</style>