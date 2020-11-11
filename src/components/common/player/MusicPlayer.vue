<template>
  <div class="player">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%" alt />
        </div>
        <div class="top">
          <div class="back">
            <span class="iconfont icon-back" @click="setFullScreen(false)"></span>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="rotate">
                <img class="image" :src="currentSong.image" alt />
              </div>
            </div>
          </div>
          <scroll class="middle-r" :data="currentLyric&&currentLyric.lines" ref="lyricList">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{'current':currentLineNum===index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="line.index"
                >{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>

        <div class="bottom">
          <div class="progress-wrapper">
            <div class="current-time">{{format(currentTime)}}</div>
            <div class="progress-bar-wrapper">
              <input
                type="range"
                class="progress-bar"
                :value="percent"
                min="0"
                max="100"
                step="1"
                :style="{'background-size':`${percent}% 100% !important`}"
                @input="onProgressInput($event.target.value)"
                ref="progress"
              />
            </div>
            <div class="toggal-time">{{totalTime}}</div>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <span class="iconfont" :class="playMode" @click="changeMode"></span>
            </div>
            <div class="icon i-left">
              <span
                class="iconfont icon-prev"
                @click.stop.prevent="prev"
                :class="{'disabled':!isDisabled}"
              ></span>
            </div>
            <div class="icon i-center" @click="switchMusic">
              <span class="iconfont icon-play" v-show="play"></span>
              <span class="iconfont icon-pause" v-show="!play"></span>
            </div>
            <div class="icon i-right">
              <span
                class="iconfont icon-next"
                @click.stop.prevent="next"
                :class="{'disabled':!isDisabled}"
              ></span>
            </div>
            <div class="icon i-right">
              <span class="iconfont icon-no-favorite"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen&&playList.length">
        <div class="mini-player-wrapper" @click="set_FullScreen(true)">
          <div class="mini-singer-img">
            <img :src="currentSong.image" alt width="100%" height="100%" :class="rotate" />
          </div>
          <div class="text">
            <h2 class="name">{{currentSong.name}}</h2>
            <p class="desc">{{currentSong.singer}}</p>
          </div>
        </div>
        <div class="control-wrapper">
          <div class="control" @click="switchMusic">
            <span class="iconfont icon-play" v-show="play"></span>
            <span class="iconfont icon-pause" v-show="!play"></span>
            <progress-circle :percent="percent"></progress-circle>
          </div>
          <div class="control">
            <span class="iconfont icon-playlist"></span>
          </div>
        </div>
      </div>
    </transition>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="updataTime"
      @canplay="ready"
      @error="error"
      @ended="end"
    ></audio>
  </div>
</template>
<script>
import { singerMixin } from '@/utils/mixin'
import { shuffle } from '@/utils/utils'
import Lyric from 'lyric-parser'
import ProgressCircle from '@/components/common/progressCircle/ProgressCircle'
import scroll from '@/components/common/scroll/scroll'
export default {
  mixins: [singerMixin],
  components: {
    ProgressCircle,
    scroll,
  },
  data() {
    return {
      musicReady: false, // 阻止快速切歌 需要歌加载完毕
      currentTime: 0, // 播放时长
      currentLyric: null, // 歌词
      currentLineNum: 0, // 歌词 第几行
    }
  },
  methods: {
    // 修改播放模式
    changeMode() {
      console.log(1)
      let mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = []
      if (this.mode === 2) {
        // 随机播放 对歌曲列表重新排序
        list = shuffle(this.playList)
      } else {
        list = this.playList
      }
      this.setPlayList(list)
      // 模式来回切换的同时 currentIndex重新获取
      this.setCurrentIndex(this.resetCurrentIndex(list))
    },
    resetCurrentIndex(list) {
      return list.findIndex((item) => item.id === this.currentSong.id)
    },
    // 动态修改播放时间
    onProgressInput(percent) {
      let progress =
        (this.currentTime / this.currentSong.duration).toFixed(6) * 100
      this.$refs.progress.style.backgroundSize = `${progress}% 100% !important`
      this.currentTime = (Number(percent) / 100) * this.currentSong.duration
      this.$refs.audio.currentTime = this.currentTime

      if (!this.play) {
        this.setPlay(true)
      }
    },
    // 全屏显示  或 底部显示
    set_FullScreen(bol) {
      this.setFullScreen(bol)
    },
    // 播放 暂停
    switchMusic() {
      this.setPlay(!this.play)
    },
    error() {
      // 加载失败 仍需设置为true 否则一直为false 功能无法使用
      this.musicReady = true
    },
    ready() {
      this.musicReady = true
    },
    // 播放结束
    end() {
      if (this.mode === 1) {
        this.loop()
      } else {
        this.next()
      }
    },
    // 循环播放
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    // 上
    prev() {
      // 当前没有加载完毕 阻止切歌
      if (!this.musicReady) return
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.play) {
        this.switchMusic()
      }
      // 归为
      this.musicReady = false
    },
    // 下
    next() {
      if (!this.musicReady) return
      if (this.playList.length === 1) {
        this.loop()
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.play) {
        this.switchMusic()
      }
      this.musicReady = false
    },
    // 更新播放时间
    updataTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 转换时间格式
    format(time) {
      time = Math.floor(time)
      let minute = Math.floor(time / 60)
      minute = minute >= 10 ? minute : `0${minute}`
      let second = Math.floor(time % 60)
      second = second >= 10 ? second : `0${second}`
      return `${minute}:${second}`
    },
    middleTouchStart(e) {
      this.initTouch = true
      let touch = e.changedTouches[0]
      this.startX = touch.pageX
      this.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.initTouch) return
      let touch = e.changedTouches[0]
      this.moveX = touch.pageX - this.startX
      this.moveY = touch.pageY - this.startY
      if (Math.abs(this.moveY) > Math.abs(this.moveX)) return
      this.lyric_percent = this.moveX / window.innerWidth
      console.log(this.lyric_percent)
      // if (this.moveX <= -window.innerWidth) {
      //   this.moveX = -window.innerWidth
      // }
      // if (this.moveX >= window.innerWidth) {
      //   this.moveX = window.innerWidth
      // }
      // this.$refs.lyricList.$el.style.transform = `translate3d(${this.moveX}px,0,0)`
    },
    middleTouchEnd(e) {
      if (this.moveX <= -200) {
        this.moveX = -window.innerWidth
      }
      if (this.moveX >= 200) {
        this.moveX = window.innerWidth
      }
      this.$refs.lyricList.$el.style.transform = `translate3d(${this.moveX}px,0,0)`
    },
    getLyric() {
      this.currentSong.getSongLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.hanldleLyric)
        if (this.play) {
          this.currentLyric.play()
        }
      })
    },
    // 歌词行数发生改变回调
    hanldleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]

        this.$refs.lyricList &&
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList && this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
  },
  computed: {
    // 播放模式  0 顺序   1 单曲   2 随机
    playMode() {
      return this.mode === 0
        ? 'icon-sequence'
        : this.mode === 1
        ? 'icon-loop'
        : 'icon-random'
    },
    // 计算播放 百分比
    percent() {
      return (this.currentTime / this.currentSong.duration).toFixed(6) * 100
    },
    // 总时间
    totalTime() {
      return this.format(this.currentSong.duration)
    },
    rotate() {
      return this.play ? 'play' : 'play pause'
    },
    // 没有加载完  禁止点击
    isDisabled() {
      return this.musicReady
    },
  },
  watch: {
    // 切换模式时 currentSong会发生变化 判断是否为一首歌
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) return
      this.$nextTick(() => {
        this.audio.play()
        if (this.getLyric) {
          this.getLyric()
        }
      })
    },
    play(play) {
      this.$nextTick(() => {
        play ? this.audio.play() : this.audio.pause()
      })
    },
  },
  mounted() {
    this.audio = this.$refs.audio
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.player {
  .normal-player {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1600;
    background: #000;
    overflow: hidden;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $text-light;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }

            .play {
              animation: rotate 20s linear infinite;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all 0.5s;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }

          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .progress-wrapper {
        display: flex;
        width: 100%;
        padding: 15px 0;

        .current-time, .toggal-time {
          flex: 2;
          color: $text-light;
          font-size: $font-size-small;
          display: flex;
          align-items: center;
        }

        .current-time {
          justify-content: flex-end;
        }

        .toggal-time {
          justify-content: flex-start;
        }

        .progress-bar-wrapper {
          flex: 9;
          box-sizing: border-box;
          display: flex;
          align-items: center;

          .progress-bar {
            width: 100%;
            height: 2px;
            margin: 0 6px;
            box-sizing: border-box;
            -webkit-appearance: none; /* 清除系统默认样式 */
            background: -webkit-linear-gradient(#ecf0f1, #ecf0f1) no-repeat, rgba(255, 255, 255, 0.3); /* 设置左边颜色为#61bd12，右边颜色为#ddd */
            background-size: 0 100%; /* 设置左右宽度比例 */
            border-radius: 5px;

            &:focus {
              outline: none;
            }

            &::-webkit-slider-thumb {
              -webkit-appearance: none; /* 清除系统默认样式 */
              height: 8px; /* 拖动块高度 */
              width: 8px; /* 拖动块宽度 */
              background: #ecf0f1; /* 拖动块背景 */
              border-radius: 50%; /* 外观设置为圆形 */
              border: solid 2px #ddd; /* 设置边框 */
            }
          }
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;

          .iconfont {
            color: #fff;
            font-size: 20px;
          }

          .icon-favorite {
            color: red;
            font-size: 24px;
          }

          .icon-play, .icon-pause {
            font-size: 28px;
          }
        }

        .i-center {
          text-align: center;
        }

        .i-left {
          text-align: center;
        }

        .i-right {
          text-align: center;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }

    &.normal-enter-to, &.normal-leave {
      opacity: 1;

      .top {
        transform: translate3d(0, 0, 0);
      }

      .bottom {
        transform: translate3d(0, 0, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1600;
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 3px 0 3px rgba(0, 0, 0, 0.3);

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
      transform: translateY(100%);
    }

    &.mini-enter-to, &.mini-leave {
      opacity: 1;
      transform: translateY(0);
    }

    .mini-player-wrapper {
      flex: 6;
      display: flex;
      align-items: center;

      .mini-singer-img {
        flex: 0 0 45px;
        width: 45px;
        height: 45px;
        margin: 0 10px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;

        .name {
          margin-bottom: 2px;
          no-wrap();
          font-size: $font-size-medium;
          color: $text-dark;
        }

        .desc {
          no-wrap();
          font-size: $font-size-small;
          color: $text-gray;
        }
      }
    }

    .control-wrapper {
      flex: 2;
      display: flex;

      .control {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-play, .icon-pause, .icon-playlist {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}

.disabled {
  pointer-events: none;
}

.play {
  animation: rotate 20s linear infinite;
}

.pause {
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>