<template>
  <transition name="slide-right">
    <div class="add-song" v-show="showAddSongPage" @click.stop>
      <div class="header">
        <div class="title">添加歌曲到列表</div>
        <div class="close">
          <span class="iconfont icon-delete" @click.stop="hide"></span>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-bar
          ref="searchBar"
          placeholder="搜索歌曲"
          :showBackIcon="false"
          @emitkeywords="emitkeywords"
        ></search-bar>
      </div>
      <div class="shortcut-wrapper">
        <div class="shortcut-tab-wrapper">
          <div class="shortcut-tab" :class="{'active':active}">
            <input type="radio" value="RecentlyPlay" v-model="view" id="recentlyPlay" />
            <label for="recentlyPlay">最近播放</label>
          </div>
          <div class="shortcut-tab" :class="{'active':!active}">
            <input type="radio" value="SearchHistory" v-model="view" id="searchHistory" />
            <label for="searchHistory">搜索历史</label>
          </div>
        </div>
        <div class="recently-play-wrapper">
          <scroll class="recently-play-scroll" :data="playHistory" v-if="active">
            <div class="recently-play-inner">
              <song-list :songs="playHistory" :number="false"></song-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="keywords">
        <keywords-suggest
          @suggestScroll="suggestScroll"
          @search_History="search_History"
          :keywords="keywords"
          :showSinger="false"
        ></keywords-suggest>
      </div>
    </div>
  </transition>
</template>
<script>
import searchBar from '../search/SearchBar'
import keywordsSuggest from '../search/KeywordsSuggest'
import scroll from '@/components/common/scroll/scroll'
import SongList from '@/components/common/song/SongList'
import { insertArr } from '@/utils/utils'
import { saveSearchHistory } from '@/utils/localStorage'
import { userMixin, musicMixin } from '@/utils/mixin'
import { getPlayHistory } from '@/utils/localStorage'
export default {
  mixins: [userMixin, musicMixin],
  data() {
    return {
      showAddSongPage: false,
      keywords: null, // 搜索关键字
      view: 'RecentlyPlay',
    }
  },
  components: {
    searchBar,
    keywordsSuggest,
    scroll,
    SongList,
  },
  computed: {
    active() {
      return this.view === 'RecentlyPlay'
    },
  },
  methods: {
    suggestScroll() {
      this.$refs.searchBar.blur()
    },
    search_History(keywords) {
      // console.log(keywords)
      let search = insertArr(this.searchHistory, keywords)
      this.setSearchHistory(search)
      saveSearchHistory(this.qq_num, search)
    },
    emitkeywords(key) {
      this.keywords = key
    },
    show() {
      this.showAddSongPage = true
    },
    hide() {
      this.showAddSongPage = false
      this.keywords = null
      this.$refs.searchBar.setQuery(null)
    },
  },
  created() {
    // 向vuex中播放历史 从本地初始化
    let list = getPlayHistory(this.qq_num)
    this.setPlayHistory(list)
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.add-song {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .header {
    position: relative;
    height: 44px;
    text-align: center;

    .title {
      line-height: 44px;
      font-size: $font-size-medium-x;
      color: $text-dark;
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      center();

      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }

  .shortcut-wrapper {
    position: absolute;
    top: 115px;
    width: 100%;
    bottom: 0;

    .shortcut-tab-wrapper {
      padding: 0 0 15px;
      height: 25px;
      center();

      .active {
        background: #34495e;
        color: #fff;
      }

      .shortcut-tab:first-child {
        border-right: none;
      }

      .shortcut-tab {
        height: 100%;
        center();
        border: 1px solid #bdc3c7;
        box-sizing: border-box;
        transition: all 0.2s;

        [type='radio'] {
          width: 0;
          height: 0;
        }

        label {
          padding: 0 15px;
          font-size: $font-size-small;
        }
      }
    }

    .recently-play-wrapper {
      position: absolute;
      top: 40px;
      bottom: 0;
      width: 100%;

      .recently-play-scroll {
        height: 100%;
        overflow: hidden;

        .recently-play-inner {
          padding: 0 30px;
        }
      }
    }
  }

  .search-result {
    position: fixed;
    top: 110px;
    bottom: 0;
    width: 100%;
  }

  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;

    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }

    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
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
  transition: all 0.3s;
}
</style>