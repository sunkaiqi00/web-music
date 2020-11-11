import { mapGetters, mapActions, mapMutations } from 'vuex';
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
    initPlaySong(songs, index) {
      this.SET_PLAYLIST(songs);
      this.SET_SEQUENCELIST(songs);
      this.SET_CURRENTINDEX(index);
      this.SET_PLAY(true);
    }
  }
};
