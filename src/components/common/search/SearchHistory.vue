<template>
  <div class="search-history-wrapper">
    <div class="title">
      <div class="text">搜索历史</div>
      <div class="clear" @click="clearAll">
        <span class="iconfont icon-clear"></span>
      </div>
    </div>
    <div class="search-list">
      <ul>
        <li
          class="search-item"
          @click="searchKey(item)"
          v-for="(item,index) in searchHistory_List"
          :key="index"
        >
          <div class="search-key">{{item}}</div>
          <div class="icon" @click.prevent.stop="deleteOne(item)">
            <span class="iconfont icon-delete"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchHistory_List: {
      type: Array,
      default: null,
    },
  },
  methods: {
    searchKey(key) {
      this.$emit('serachHotKey', key.replace('/-/', ' '))
    },
    clearAll() {
      this.$emit('clearAll')
    },
    deleteOne(key) {
      this.$emit('deleteOne', key)
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.search-history-wrapper {
  width: 100%;
  height: 100%;

  .title {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: $font-size-medium;
    color: $text-dark;
    padding: 0 20px;

    .text {
      flex: 14;
      font-size: $font-size-medium-x;
    }

    .clear {
      flex: 1;
      text-align: right;

      .icon-clear {
        font-size: $font-size-large;
        color: $text-dark;
      }
    }
  }

  .search-list {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;

    .search-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      font-size: $font-size-small;

      .search-key {
        flex: 16;
      }

      .icon {
        flex: 1;
        text-align: center;
      }

      .icon-delete {
        font-size: $font-size-small-s;
        margin-left: 1px;
      }
    }
  }
}
</style>