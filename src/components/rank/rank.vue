<template>
  <div class="rank" ref="rankPage">
    <scroll :data="top_List" class="toplist" ref="topList">
      <ul class="scroll">
        <li class="item" v-for="item in top_List" :key="item.id" @click="showTopList(item)">
          <div class="icon">
            <img v-lazy="item.picUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList" :key="index">
              <span>{{ index + 1 }}.</span>
              <span>{{song.songname + ' - ' + song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="loading-container" v-show="!topList">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import { getTopList } from '@/api/request'
import { ERR_OK } from '@/api/config'
import scroll from '@/components/common/scroll/scroll'
import loading from '@/components/common/loading/loading'
import { singerMixin } from '@/utils/mixin'
export default {
  mixins: [singerMixin],
  data() {
    return {
      top_List: null,
    }
  },
  components: {
    scroll,
    loading,
  },
  methods: {
    showTopList(item) {
      this.setTopList(item)
      this.$router.push({
        path: '/rank/toplist',
        query: {
          title: item.topTitle,
          id: item.id,
        },
      })
    },
    handlePlayList(payList) {
      let bottom = payList.length > 0 ? '60px' : ''
      this.$refs.rankPage.style.bottom = bottom
      this.$refs.topList.refresh()
    },
    async _getTopList() {
      let { code, data } = await getTopList()
      if (code === ERR_OK) {
        this.top_List = data.topList
        console.log()
      }
    },
  },
  created() {
    this._getTopList()
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .scroll {
      padding: 10px 0 20px;

      .item {
        display: flex;
        margin: 0 20px 20px;
        height: 100px;
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

        &:last-child {
          margin-bottom: 0;
        }

        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .songlist {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 15px;
          height: 100px;
          overflow: hidden;
          color: $text-dark;
          font-size: $font-size-small;

          .song {
            no-wrap();
            line-height: 26px;
          }
        }
      }
    }
  }

  .loading-container {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>