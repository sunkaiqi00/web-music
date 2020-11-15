<template>
  <transition name="slide-right">
    <div class="search">
      <search-bar ref="searchBar" @emitkeywords="emitkeywords"></search-bar>
      <div class="shortcut-wrapper" ref="shortcut">
        <div class="shortcut">
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                class="item"
                v-for="item in hotKey"
                :key="item.n"
                @click="serachHotKey(item.k)"
              >{{item.k}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="search-history" v-show="search_history_list.length&&hotKey" :style="{top:top}">
        <search-history
          :searchHistory_List="search_history_list"
          @clearAll="showToast"
          @deleteOne="deleteOne"
          @serachHotKey="serachHotKey"
        ></search-history>
      </div>
      <div class="search-result" v-show="keywords" ref="searchResult">
        <keywords-suggest
          ref="keywords_Suggest"
          :keywords="keywords"
          @suggestScroll="suggestScroll"
          @search_History="search_History"
        ></keywords-suggest>
      </div>
      <confirm-toast ref="toast" :title="title" @confirm="clearAll"></confirm-toast>
    </div>
  </transition>
</template>
<script>
import { getHotKey } from '@/api/request'
import { ERR_OK } from '@/api/config'
import {
  saveSearchHistory,
  getSearchHistory,
  removeLocalStorage,
} from '@/utils/localStorage'
import { SEARCHHISTORY } from '@/utils/const'
import { userMixin, musicMixin } from '@/utils/mixin'
import { insertArr } from '@/utils/utils'
import SearchBar from '@/components/common/search/SearchBar'
import KeywordsSuggest from '@/components/common/search/KeywordsSuggest'
import SearchHistory from '@/components/common/search/SearchHistory'
import ConfirmToast from '@/components/common/confirmToast/ConfirmToast'
export default {
  mixins: [userMixin, musicMixin],
  data() {
    return {
      hotKey: null,
      keywords: null,
      title: '是否清空所有搜索记录？',
      top: 0,
    }
  },
  components: {
    SearchBar,
    KeywordsSuggest,
    SearchHistory,
    ConfirmToast,
  },
  computed: {
    search_history_list() {
      return this.searchHistory
    },
  },
  methods: {
    handlePlayList(playList) {
      let bottom = playList.length > 0 ? '60px' : 0
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.keywords_Suggest.refresh()
    },
    showToast() {
      this.$refs.toast.show()
    },
    // 清楚全部搜索历史
    clearAll() {
      removeLocalStorage(this.qq_num, SEARCHHISTORY).then((res) => {
        if (res) {
          this.setSearchHistory([])
        }
      })
    },
    // 单个删除 搜索历史
    deleteOne(key) {
      // 缓存取搜素历史
      let searchList = getSearchHistory(this.qq_num).filter(
        (item) => item !== key
      )
      this.setSearchHistory(searchList)
      saveSearchHistory(this.qq_num, searchList)
    },
    // 搜索列表点击搜索 保存关键词
    search_History(keywords) {
      let search = insertArr(this.searchHistory, keywords)
      this.setSearchHistory(search)
      saveSearchHistory(this.qq_num, search)
    },
    // 滑动搜索列表  让输入框失去焦点
    suggestScroll() {
      this.$refs.searchBar.blur()
    },
    // 搜索框输入 修改关键词
    emitkeywords(k) {
      this.keywords = k
    },
    // 点击热门搜索 设置输入框内容
    serachHotKey(k) {
      this.$refs.searchBar.setQuery(k)
    },
    async _getHotKey() {
      let { code, data } = await getHotKey()
      if (code === ERR_OK) {
        this.hotKey = data.hotkey.slice(0, 10)
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === '/home/profile') {
        this.keywords = null
      }
    },
    hotKey() {
      this.$nextTick(() => {
        let top =
          this.$refs.shortcut.offsetHeight +
          this.$refs.searchBar.$el.offsetHeight +
          10 +
          'px'
        this.top = top
      })
    },
  },
  created() {
    this._getHotKey()
    // 查询本地存储搜索历史 初始vuex中保存的搜索历史
    let initSearch = getSearchHistory(this.qq_num)
      ? getSearchHistory(this.qq_num)
      : []
    this.setSearchHistory(initSearch)
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.search {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .shortcut-wrapper {
    margin-top: 10px;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium-x;
          color: $text-dark;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          font-size: $font-size-small-s;
          background: $color-highlight-background;
          color: $text-dark;
        }
      }
    }
  }

  .search-history {
    position: absolute;
    top: 200px;
    bottom: 0;
    width: 100%;
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 68px;
    bottom: 0;
    background: #fff;
  }
}

.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-right-enter-to, .slide-right-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.2s;
}
</style>