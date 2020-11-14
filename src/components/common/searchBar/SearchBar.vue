<template>
  <div class="search-page-wrapper">
    <div class="back">
      <span class="iconfont icon-back" @click="goback"></span>
    </div>
    <div class="search-input-wrapper">
      <span class="iconfont icon-search"></span>
      <input ref="searchInput" v-model="keywords" class="search-input" :placeholder="placeholder" />
      <span @click="clearQuery" v-show="keywords" class="iconfont icon-clear"></span>
    </div>
    <div v-show="keywords" class="search-button">搜索</div>
  </div>
</template>
<script>
import { throttle } from '@/utils/utils'
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲,歌手',
    },
  },
  data() {
    return {
      keywords: null,
    }
  },
  methods: {
    // 输入框失去焦点
    blur() {
      this.$refs.searchInput.blur()
    },
    // 父组件设置搜索关键词
    setQuery(keywords) {
      this.keywords = keywords
    },
    clearQuery() {
      this.keywords = ''
    },
    goback() {
      this.keywords = null
      this.$router.go(-1)
    },
  },
  created() {
    this.$watch(
      'keywords',
      throttle((newkeywords) => {
        this.$emit('emitkeywords', newkeywords)
      }, 200)
    )
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.search-page-wrapper {
  position: relative;
  width: 100%;
  height: 60px;

  .back {
    position: absolute;
    width: 40px;
    height: 100%;
    color: $text-gray;
    center();

    .icon-back {
      margin-left: 5px;
    }
  }

  .search-button {
    position: absolute;
    right: 0;
    width: 50px;
    height: 100%;
    font-size: 10px;
    center();
  }

  .search-input-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 30px;
    border-radius: 20px;
    border: 1px solid #576574;

    .icon-search {
      flex: 0 0 35px;
      width: 35px;
      center();
      font-size: $font-size-medium-x;
      color: $text-dark;
    }

    .search-input {
      flex: 1;
      height: 100%;
      color: transparent;
      font-size: 12px;
      text-shadow: 0 0 gray;
      outline: 0;
      border-radius: 20px;

      &::placeholder {
        color: #bdc3c7;
      }
    }

    .icon-clear {
      flex: 0 0 35px;
      width: 35px;
      center();
      font-size: $font-size-small-s;
      color: $text-dark;
    }
  }
}
</style>