<template>
  <scroll
    class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    @onScroll="onScroll"
  >
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.list" :key="item.id" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" />
            <span class="name">{{item.name}}</span>
            <div class="focus-wrapper">
              <span class="focus-iconadd">＋</span>
              <span class="focus-title">关注</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      v-show="data"
      @touchstart.prevent.stop="onShortCutStart"
      @touchmove.prevent.stop="onShortCutMove"
    >
      <ul>
        <li
          v-for="(item,index) in shortCut"
          :key="index"
          class="item"
          :data-index="index"
          :class="{'active':currentIndex===index}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="currentTitle" ref="fixedTitle">
      <div class="fixed-title">{{currentTitle}}</div>
    </div>
    <div class="loading-container" v-if="!data.length">
      <loading />
    </div>
  </scroll>
</template>
<script>
import scroll from '@/components/common/scroll/scroll'
import loading from '@/components/common/loading/loading'
import { attribute } from '@/utils/dom'
import { homeMixin } from '@/utils/mixin'
const ONE_CHURT_CUT_HEIGHT = 18
const FIXED_TITLE_HEIGHT = 33
export default {
  mixins: [homeMixin],
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      listenScroll: true,
      viewListHeight: [],
      currentIndex: 0,
      scrollY: null,
      diff: 0, // 滚动差
    }
  },
  components: {
    scroll,
    loading,
  },
  computed: {
    // 顶部固定 title
    currentTitle() {
      if (this.scrollY > 0) {
        return ''
      } else {
        // debugger
        return this.data[this.currentIndex].title
      }
    },
    // 右侧 字母导航
    shortCut() {
      if (this.data) {
        return this.data.map((item) => item.title.slice(0, 1))
      }
    },
  },
  methods: {
    onScroll(location) {
      this.scrollY = location.y
      this.setScrollOffsetY(location.y)
    },
    // 点击字母 获取索引 歌手页滚动到对应位置
    onShortCutStart(e) {
      this.anchorIndex = attribute(e.target, 'index')
      if (!this.anchorIndex) return
      this.startY = e.touches[0].pageY
      this._scrollToElement(this.anchorIndex)
    },
    // 一个字母的高度为18  计算手指移动距离 / 18  加上点击的索引  手指滑动 歌手页跟随滑动
    onShortCutMove(e) {
      this.moveY = e.touches[0].pageY
      let delta = Math.floor((this.moveY - this.startY) / ONE_CHURT_CUT_HEIGHT)
      let moveIndex = parseInt(this.anchorIndex) + delta
      this._scrollToElement(moveIndex)
    },
    // 页面滚动
    _scrollToElement(index) {
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 1)
    },
    // 计算歌手页面每个 li(一个list-group) 的高度
    calculateHeight() {
      let list = this.$refs.listgroup
      let height = 0
      this.viewListHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.viewListHeight.push(height)
      }
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      // 1. 滚动到顶部 newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 2. 中间部分滚动
      for (let i = 0; i < this.viewListHeight.length - 1; i++) {
        let h1 = this.viewListHeight[i]
        let h2 = this.viewListHeight[i + 1]
        if (-newY >= h1 && -newY < h2) {
          this.currentIndex = i
          this.diff = h2 + newY
          return
        }
      }
      // 3. 滚动到底部 且 -newY大于最后一个元素的上限
      this.currentIndex = this.viewListHeight.length - 1
    },
    diff(newDiff) {
      let fixedTop =
        newDiff > 0 && newDiff < FIXED_TITLE_HEIGHT
          ? newDiff - FIXED_TITLE_HEIGHT
          : 0
      if (this.fixedTop === fixedTop) return
      this.fixedTop = fixedTop
      this.$refs.fixedTitle.style.transform = `translate3d(0,${this.fixedTop}px,0)`
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $text-dark;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      position: relative;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $text-dark;
        font-size: $font-size-medium;
      }

      .focus-wrapper {
        position: absolute;
        right: 30px;
        border: 1px solid #bdc3c7;
        padding: 0 5px;
        border-radius: 15px;
        transform: scale(0.9);
        center();
        box-sizing: border-box;

        .focus-iconadd {
          font-size: 16px;
          font-weight: 500;
          margin-right: -2px;
          margin-bottom: 2px;
        }

        .focus-title {
          font-size: 2px;
          margin-right: 2px;
        }
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%) scale(0.9);
    width: 15px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-highlight-background;
    font-family: Helvetica;

    ul li:nth-child(1) {
      margin-left: -1px;
    }

    .item {
      padding: 3px;
      line-height: 1;
      color: $text-gray;
      font-size: $font-size-small-s;
      transition: all 0.2s;
    }

    .active {
      color: $text-dark;
      font-weight: 700;
      font-size: $font-size-small;
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $text-dark;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 50;
  }
}
</style>