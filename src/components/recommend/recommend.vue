<template>
  <div class="recommend" ref="recommend">
    <scroll
      ref="scroll"
      class="recommend-content"
      :data="discList"
      :listenScroll="listenScroll"
      @onScroll="onScroll"
    >
      <div>
        <div v-if="bannerList.length" class="slider-wrapper">
          <div class="slider-content">
            <slider ref="slider">
              <div v-for="item in bannerList" :key="item.id">
                <a :href="item.linkUrl">
                  <img class="needsclick" @load="bannerLoad" :src="item.picUrl" />
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="discList.length!==0">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" :key="item.dissid" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" alt class="icon-img" />
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name||'流行金曲'}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-if="discList.length===0">
        <loading />
      </div>
    </scroll>
  </div>
</template>
<script>
import { banner, discList } from '@/api/request'
import { ERR_OK } from '@/api/config'
import slider from '@/components/common/slider/slider'
import scroll from '@/components/common/scroll/scroll'
import loading from '@/components/common/loading/loading'
import { homeMixin } from '@/utils/mixin'
export default {
  mixins: [homeMixin],
  data() {
    return {
      bannerList: [],
      discList: [],
      checkLoad: false,
      listenScroll: true,
    }
  },
  components: {
    slider,
    scroll,
    loading,
  },

  methods: {
    onScroll(location) {
      this.setScrollOffsetY(location.y)
    },
    // banner 请求
    async getBanner() {
      let { code, data } = await banner()
      if (code === ERR_OK) {
        this.bannerList = data.slider
      }
    },
    // 推荐列  请求
    async getrecoList() {
      let { code, data } = await discList()
      if (code === ERR_OK) {
        this.discList = data.list
      }
    },
    // 对于轮播和推荐列表的异步请求 可能导致better-scroll计算高度 错误  图片只要加载一个刷新scoll
    bannerLoad() {
      if (!this.checkLoad) this.$refs.scroll.refresh()
      this.checkLoad = true
    },
  },

  created() {
    this.getBanner()
    this.getrecoList()
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $text-dark;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;

          .icon-img {
            width: 60px;
            height: 60px;
          }
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;

          .name {
            margin-bottom: 10px;
            color: $text-dark;
          }

          .desc {
            color: $text-gray;
            font-size: $font-size-medium;
          }
        }
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
    }
  }
}
</style>