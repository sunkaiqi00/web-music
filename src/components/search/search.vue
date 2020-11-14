<template>
  <transition name="slide-up">
    <div class="search">
      <search-bar ref="searchBar" @emitkeywords="emitkeywords"></search-bar>
      <div class="shortcut-wrapper">
        <div class="shortcut">
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotKey" :key="item.n" @click="serachHotKey(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="search-result" v-show="keywords">
        <keywords-suggest :keywords="keywords" @suggestScroll="suggestScroll"></keywords-suggest>
      </div>
    </div>
  </transition>
</template>
<script>
import SearchBar from '@/components/common/searchBar/SearchBar'
import KeywordsSuggest from '@/components/common/keywordsSuggest/KeywordsSuggest'
import { getHotKey } from '@/api/request'
import { ERR_OK } from '@/api/config'
export default {
  data() {
    return {
      hotKey: null,
      keywords: null,
    }
  },
  components: {
    SearchBar,
    KeywordsSuggest,
  },
  methods: {
    suggestScroll() {
      this.$refs.searchBar.blur()
    },
    emitkeywords(k) {
      this.keywords = k
    },
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
  },
  created() {
    this._getHotKey()
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
    position: fixed;
    top: 68px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $text-dark;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-small-s;
          color: $text-dark;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 68px;
    bottom: 0;
    background: #fff;
  }
}

.slide-up-enter, .slide-up-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-up-enter-to, .slide-up-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s;
}
</style>