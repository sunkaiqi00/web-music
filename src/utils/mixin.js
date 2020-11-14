import { mapGetters, mapActions, mapMutations } from 'vuex';
import { copy, shuffle, find_index } from '@/utils/utils';

export const singerMixin = {
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
    ])
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
    // 歌手详情页 点击歌曲初始化
    initPlaySong(songs, index) {
      let list = copy(songs);
      this.setSequenceList(list);
      // 考虑当前是否随机播放
      if (this.mode === 2) {
        let randomList = copy(songs);
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
      let sequenceList = copy(songs);
      this.setSequenceList(sequenceList);
      let playList = copy(songs);
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
    handlePlayList(list) {
      console.log(list);
    }
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
    ...mapGetters(['qq_num', 'searchHistory'])
  },
  methods: {
    ...mapMutations(['SET_SEARCH_HISTORY']),
    ...mapActions(['setSearchHistory'])
  }
};
