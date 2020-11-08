<template>
  <div class="recommend" ref="recommend">
    <div ref="scroll" class="recommend-content">
      <div>
        <div v-if="bannerList.length" class="slider-wrapper">
          <div class="slider-content">
            <slider ref="slider">
              <div v-for="item in bannerList" :key="item.id">
                <a :href="item.linkUrl">
                  <img v-lazy="item.picUrl" />
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul></ul>
        </div>
      </div>
      <div class="loading-container"></div>
    </div>
  </div>
</template>
<script>
import { banner, discList } from '@/api/request'
import { ERR_OK } from '@/api/config'
import slider from '@/components/common/slider/slider'
export default {
  data() {
    return {
      bannerList: [],
      discList: [],
    }
  },
  components: {
    slider,
  },

  methods: {
    async getBanner() {
      let { code, data } = await banner()
      if (code === ERR_OK) {
        this.bannerList = data.slider
      }
    },
    async getrecoList() {
      let { code, data } = await discList()
      if (code === ERR_OK) {
        this.discList = data.list
      }
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
        color: $color-theme;
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
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>