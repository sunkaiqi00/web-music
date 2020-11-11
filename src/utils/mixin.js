import { mapGetters, mapActions, mapMutations } from 'vuex';
import { copy, shuffle, find_index } from '@/utils/utils';
export const homeMixin = {
  computed: {
    ...mapGetters(['scrollOffsetY'])
  },
  methods: {
    ...mapMutations(['SET_SCROLL_OFFSETY']),
    ...mapActions(['setScrollOffsetY'])
  }
};

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
      'currentSong'
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
      'SET_CURRENTINDEX'
    ]),
    ...mapActions([
      'setSinger',
      'setPlay',
      'setFullScreen',
      'setPlayList',
      'setSequenceList',
      'setMode',
      'setCurrentIndex'
    ]),
    // 歌手详情页 点击歌曲初始化
    initPlaySong(songs, index) {
      let list = copy(songs);
      this.setSequenceList(list);
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
    }
  }
};
