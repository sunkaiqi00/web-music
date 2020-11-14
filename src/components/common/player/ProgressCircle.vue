<template>
  <div class="progress-circle">
    <svg
      class="svg-wrapper"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        stroke="#000"
        stroke-width="6"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dashArray: Math.PI * 100,
    }
  },
  computed: {
    dashOffset() {
      return (1 - this.percent / 100) * this.dashArray
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.progress-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;

  .svg-wrapper {
    .progress-background {
      transform-origin: center;
      transform: scale(0.9);
    }

    .progress-bar {
      transform-origin: center;
      transform: scale(0.9) rotate(-90deg);
    }
  }
}
</style>