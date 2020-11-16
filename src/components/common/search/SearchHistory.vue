<template>
  <div class="search-history-wrapper">
    <div class="title">
      <div class="text" v-show="showTitle&&searchHistory_List.length">搜索历史</div>
      <div class="clear" @click="clearAll" v-show="showClear&&searchHistory_List.length">
        <span class="iconfont icon-clear"></span>
      </div>
    </div>
    <div class="search-list">
      <transition-group name="list" tag="ul" :refreshDelay="100">
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
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchHistory_List: {
      type: Array,
      default: [],
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    showClear: {
      type: Boolean,
      default: true,
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

      &.list-enter-active, &.list-leave-active {
        transition: all 0.1s;
      }

      &.list-enter, &.list-leave-to {
        opacity: 0;
        transform: translateX(10px);
      }

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