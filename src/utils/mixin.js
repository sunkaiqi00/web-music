import { mapGetters, mapActions, mapMutations } from 'vuex';
import { shuffle, find_index } from '@/utils/utils';
import { saveSearchHistory, getSearchHistory, removeLocalStorage } from '@/utils/localStorage';
import { insertArr } from '@/utils/utils';
import { SEARCHHISTORY } from '@/utils/const';
export const musicMixin = {
  computed: {
    ...mapGetters([
      'singer',
      'play',
      'fullScreen',
      'playList',
      'sequenceList',
      'mode',
      'currentIndex',
      'currentSong',
      'popularSongs',
      'topList'
    ]),
    // 播放模式  0 顺序   1 单曲   2 随机
    playMode() {
      return this.mode === 0 ? 'icon-sequence' : this.mode === 1 ? 'icon-loop' : 'icon-random';
    }
  },
  methods: {
    ...mapMutations([
      'SET_SINGER',
      'SET_PLAY',
      'SET_FULLSCREEN',
      'SET_PLAYLIST',
      'SET_SEQUENCELIST',
      'SET_MODE',
      'SET_CURRENTINDEX',
      'SET_POPULARSONGS',
      'SET_TOPLIST'
    ]),
    ...mapActions([
      'setSinger',
      'setPlay',
      'setFullScreen',
      'setPlayList',
      'setSequenceList',
      'setMode',
      'setCurrentIndex',
      'setPopularSongs',
      'setTopList'
    ]),
    // 修改播放模式
    changeMode() {
      let mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = [];
      if (this.mode === 2) {
        // 随机播放 对歌曲列表重新排序
        list = shuffle(this.playList);
      } else {
        list = this.playList;
      }
      this.setPlayList(list);
      // 模式来回切换的同时 currentIndex重新获取
      this.setCurrentIndex(this.resetCurrentIndex(list));
    },
    resetCurrentIndex(list) {
      return list.findIndex(item => item.id === this.currentSong.id);
    },
    // 歌手详情页 点击歌曲初始化
    initPlaySong(songs, index) {
      let list = songs.slice(0);
      this.setSequenceList(list);
      // 考虑当前是否随机播放
      if (this.mode === 2) {
        let randomList = songs.slice(0);
        this.setPlayList(shuffle(randomList));
        index = find_index(randomList, list[index]);
      } else {
        this.setPlayList(songs);
      }
      this.setCurrentIndex(index);
      this.setPlay(true);
    },
    // 歌手详情页 点击随机播放初始化
    RandomPlat(songs) {
      this.setMode(2);
      let sequenceList = songs.slice(0);
      this.setSequenceList(sequenceList);
      let playList = songs.slice(0);
      this.setPlayList(shuffle(playList));
      let index = Math.floor(Math.random() * songs.length);
      this.setCurrentIndex(index);
      this.setPlay(true);
    },
    // 搜索列表点击播放歌曲
    insertSong(song) {
      // 记录当前播放歌
      let nowPlaySong = this.playList[this.currentIndex];
      let insert_payList = this.playList;
      // 播放列表中是否有这个
      let fd_p_Index = find_index(insert_payList, song);
      // 当前索引 playlist
      let now_p_currentIndex = this.currentIndex;
      // 加入 所以++
      // debugger;
      now_p_currentIndex++;

      // 如果播放列表为空 索引不必++ 等于0
      if (insert_payList.length === 0) {
        now_p_currentIndex = 0;
      }
      // 加入这首歌  有没有找到都先加入
      insert_payList.splice(now_p_currentIndex, 0, song);

      // 找到了这首歌
      if (fd_p_Index > -1) {
        // 当前歌曲的索引大于要加入歌曲的索引
        if (now_p_currentIndex > fd_p_Index) {
          // 删除这首歌 后面的元素会向前补 索引要--
          insert_payList.splice(fd_p_Index, 1);
          now_p_currentIndex--;
        } else {
          insert_payList.splice(fd_p_Index + 1, 1);
        }
      }
      // sequenceList
      // 要加入的位置
      let now_s_currentIndex = find_index(this.sequenceList, this.currentSong) + 1;
      // 是否有该首歌
      let fd_s_index = find_index(this.sequenceList, song);
      // 加入
      let insert_sequenceList = this.sequenceList;
      insert_sequenceList.splice(now_s_currentIndex, 0, song);
      if (fd_s_index > -1) {
        if (now_s_currentIndex > fd_s_index) {
          insert_sequenceList.splice(fd_s_index, 1);
        } else {
          insert_sequenceList.splice(fd_s_index + 1, 1);
        }
      }
      // // 提交
      this.setPlayList(insert_payList);
      this.setSequenceList(insert_sequenceList);
      this.SET_CURRENTINDEX(now_p_currentIndex);
      this.setPlay(true);
    },
    // 删除一首歌
    deleteSong(song) {
      let p_list = this.playList.slice(0);
      let s_list = this.sequenceList.slice(0);
      let c_index = this.currentIndex;
      let p_index = find_index(p_list, song);
      let s_index = find_index(s_list, song);
      p_list.splice(p_index, 1);
      s_list.splice(s_index, 1);
      if (c_index > p_index) {
        c_index--;
      }

      if (p_list.length === 0) {
        this.setPlay(false);
      }
      this.setCurrentIndex(c_index);
      this.setPlayList(p_list);
      this.setSequenceList(s_list);
    },
    // 删除播放列表
    clearSongList() {
      this.setPlayList([]);
      this.setSequenceList([]);
      this.setCurrentIndex(0);
      this.setPlay(false);
    },
    handlePlayList(list) {}
  },
  mounted() {
    this.handlePlayList(this.playList);
  },
  activated() {
    this.handlePlayList(this.playList);
  },
  watch: {
    playList(list) {
      this.handlePlayList(list);
    }
  }
};

export const userMixin = {
  computed: {
    ...mapGetters(['qq_num', 'searchHistory', 'playHistory'])
  },
  methods: {
    ...mapMutations(['SET_SEARCH_HISTORY', 'SET_PLAYHISTORY']),
    ...mapActions(['setSearchHistory', 'setPlayHistory']),
    // 点击热门搜索 设置输入框内容
    serachHotKey(k) {
      this.$refs.searchBar.setQuery(k);
    },
    showToast() {
      this.$refs.toast.show();
    },
    // 清楚全部搜索历史
    clearAll() {
      removeLocalStorage(this.qq_num, SEARCHHISTORY).then(res => {
        if (res) {
          this.setSearchHistory([]);
        }
      });
    },
    // 单个删除 搜索历史
    deleteOne(key) {
      // 缓存取搜素历史
      let searchList = getSearchHistory(this.qq_num).filter(item => item !== key);
      this.setSearchHistory(searchList);
      saveSearchHistory(this.qq_num, searchList);
    },
    // 搜索列表点击搜索 保存关键词
    search_History(keywords) {
      // console.log(keywords)
      let search = insertArr(this.searchHistory, keywords, item => {
        return item === keywords;
      });
      this.setSearchHistory(search);
      saveSearchHistory(this.qq_num, search);
    }
  }
};
