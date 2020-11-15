<template>
  <scroll
    ref="keywordsuggest"
    class="suggest"
    :data="list"
    :pullup="pullup"
    @scrollToEnd="searchMore"
    :beforeScroll="beforeScroll"
    @before_Scroll="before_Scroll"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in list" :key="index" @click="displaySong(item)">
        <div class="suggest-item-wrapper" v-if="!item.type">
          <div class="icon">
            <span class="iconfont icon-music"></span>
          </div>
          <div class="name">
            <p class="text">{{displayName(item)}}</p>
          </div>
        </div>
        <div class="suggest-singer-wrapper" v-if="item.singerimg">
          <div class="singer-img-wrapper">
            <img :src="item.singerimg" class="singer-img" />
          </div>
          <div class="singer-msg-wrapper">
            <div class="singer-name">歌手: {{item.singername}}</div>
            <div class="singer-album-wrapper">
              <div class="songs">歌曲: {{item.songnum}}</div>
              <div class="album">专辑: {{item.albumnum}}</div>
            </div>
          </div>
        </div>
      </li>
      <div class="loading-container" v-show="hasMore&&keywords">
        <loading :titleShow="false"></loading>
      </div>
      <div class="no-nothing-wrapper" v-show="!hasMore&&!list.length">
        <nothing></nothing>
      </div>
    </ul>
  </scroll>
</template>
<script>
import { searchKeywords } from '@/api/request'
import { ERR_OK } from '@/api/config'
import { createSong, isValidMusic, processSongsUrl } from '@/api/songs'
import scroll from '@/components/common/scroll/scroll'
import loading from '@/components/common/loading/loading'
import nothing from '@/components/common/loading/nothing'
import { musicMixin } from '@/utils/mixin'
const TYPE_SINGER = 'singer'
const PERPAGE = 20 //一次请求多少数据
export default {
  mixins: [musicMixin],
  props: {
    keywords: {
      type: String,
      default: '',
    },
    showSinger: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      page: 1,
      list: null, //  关键词搜索的列表
      pullup: true, // 开启下拉刷新
      hasMore: true, // 数据请求是否完成
      beforeScroll: true, // 监听scroll组件 beforeScroll事件
    }
  },
  components: {
    scroll,
    loading,
    nothing,
  },
  methods: {
    refresh() {
      this.$refs.keywordsuggest.refresh()
    },
    // 搜索列表滚动向父组件派发事件 让输入框失去焦点
    before_Scroll() {
      this.$emit('suggestScroll')
    },
    // 点击搜索信息
    displaySong(item) {
      // 将这个搜索历史缓存
      this.$emit('search_History', `${item.name} ${item.singer}`)
      //  歌手 调转到详情页
      if (item.type === TYPE_SINGER) {
        let singer = {
          avatar: item.singerimg,
          id: item.singermid,
          name: item.singername,
        }
        this.setSinger(singer)
        this.$router.push({
          path: '/singer/detail',
          query: {
            singer_name: singer.name,
            singer_id: singer.id,
          },
        })
      } else {
        // 播放这首歌
        processSongsUrl([item])
          .then((song) => {
            let _song = song[0]
            this.insertSong(_song)
          })
          .catch((err) => {
            alert('请开通会员')
          })
      }
    },
    displayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    avatar(singerid) {
      return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singerid}.jpg?max_age=2592000`
    },
    // 判断请求数据是否有歌手信息
    structure(data) {
      let res = []
      if (data.zhida && data.zhida.singerid && this.page === 1) {
        res.push({
          ...data.zhida,
          ...{ type: TYPE_SINGER },
          ...{ singerimg: this.avatar(data.zhida.singermid) },
        })
      }
      res = res.concat(this.normalize(data.song.list))
      return res
    },
    normalize(list) {
      let res = []
      list.forEach((item) => {
        //判断songid或alummid存在的话就进行接收
        if (isValidMusic(item)) {
          res.push(createSong(item))
        }
      })
      return res
    },
    // 判断 请求过的数据是否超过总数居的量
    checkMore(data) {
      let song = data.song
      if (!song.list.length || song.curpage * PERPAGE >= song.totalnum) {
        this.hasMore = false
      }
    },
    searchMore() {
      if (!this.hasMore) return
      this.page++
      searchKeywords(this.keywords, this.page, this.showSinger, PERPAGE).then(
        (res) => {
          if (res.code === ERR_OK) {
            this.list = this.list && this.list.concat(this.structure(res.data))
            this.checkMore(res.data)
          }
        }
      )
    },
    async searchKeywords() {
      this.page = 1 // 关键词发生改变 重置 page 让 列表滚动到顶部(因为是一个新的请求)
      this.$refs.keywordsuggest.scrollTo(0, 0)
      this.hasMore = true
      if (!this.keywords) return
      let data = await searchKeywords(
        this.keywords,
        this.page,
        this.showSinger,
        PERPAGE
      )
      if (data.code === ERR_OK) {
        this.list = this.structure(data.data)
        this.checkMore(data.data)
      }
    },
  },
  watch: {
    // 搜索关键词 变化发送请求
    keywords(k) {
      this.list = null
      this.hasMore = true
      this.searchKeywords()
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      width: 100%;

      .suggest-singer-wrapper {
        display: flex;
        margin-bottom: 20px;

        .singer-img-wrapper {
          flex: 0 0 60px;
          width: 60px;
          height: 100%;
          overflow: hidden;

          .singer-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .singer-msg-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 10px;

          .singer-album-wrapper {
            display: flex;
            align-items: center;
            color: $text-gray;
            font-size: $font-size-small;
            margin-top: 8px;

            .songs {
              margin-right: 10px;
            }
          }
        }
      }

      .suggest-item-wrapper {
        display: flex;
        align-items: center;
        padding-bottom: 20px;

        .icon {
          flex: 0 0 30px;
          width: 30px;

          [class^='icon-'] {
            font-size: 14px;
            color: $color-text-d;
          }
        }

        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $text-dark;
          overflow: hidden;

          .text {
            no-wrap();
          }
        }
      }
    }
  }

  .no-nothing-wrapper {
    position: absolute;
    // width: 100%;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
  }

  .loading-container {
    position: relative;
    margin: 0 auto;
    width: 80px;
    height: 60px;
    background: #fff;
  }
}
</style>