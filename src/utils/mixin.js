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
    ...mapGetters(['singer'])
  },
  methods: {
    ...mapMutations(['SET_SINGER']),
    ...mapActions(['setSinger'])
  }
};
