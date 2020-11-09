import { mapGetters, mapActions } from 'vuex';
export const homeMixin = {
  computed: {
    ...mapGetters(['scrollOffsetY'])
  },
  methods: {
    ...mapActions(['setScrollOffsetY'])
  }
};
