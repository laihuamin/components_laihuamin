<template>
    <div class="VueCarousel">
        <ul class="carousel-wrapper"
        :style="{width: `${(count + 2)}00%`,transform: `translate3d(-${currentTranslateX}%, 0, 0)`, transition: `transform ${noAnimate ? 0 : interval}ms ease-in`}"
        v-on:touchstart="onTouchstart"
        v-on:touchmove="onTouchmove"
        v-on:touchend="onTouchend"
        v-on:touchcancel="onTouchcancel"
        >
            <li class="carousel-item" v-if="computedLoop">
                <img :src="carouselImg[count - 1].img" class="image" @click="toOpen(carouselImg[count - 1].url)">
            </li>
            <li class="carousel-item" v-for="(item, index) in carouselImg" :key="index">
                <img :src="item.img" class="image" @click="toOpen(item.url)">
            </li>
            <li class="carousel-item" v-if="computedLoop">
                <img :src="carouselImg[0].img" class="image" @click="toOpen(carouselImg[0].url)">
            </li>
        </ul>
        <dot-group :count="count" :now-local="currentIndex" v-if="needDot"></dot-group>
    </div>
</template>

<script>
import { openURL } from 'commons/js/bbhybrid.js';
import DotGroup from './dotGroup.vue';
export default {
  name: 'vue-carousel',
  props: {
    carouselImg: {
      type: Array,
      default: []
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 2
    },
    count: {
      type: Number
    },
    needDot: {
      type: Boolean,
      default: true
    },
    order: {
      type: String,
      default: 'backward'
    },
    interval: {
      type: Number,
      default: 200
    },
    loop: {
      type: Boolean,
      default: true
    },
    flickThreshold: {
      type: Number,
      default: 0.6
    },
    delta: {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    currentIndex: 0,
    noAnimate: false,
    nowLocal: 0,
    touch: false,
    timer: 0,
    currentTranslateX: 0,
    hasTimer: false
  }),
  destroy() {
    this.timer && this.clearTimer();
  },
  mounted() {
    if (this.order === 'backward') {
      this.go(true);
    }
    this.setTimer();
  },
  methods: {
    // 点击图片跳转
    toOpen(target) {
      if (!target) {
        return;
      }
      openURL(target);
    },
    // 初始化index
    go(direction) {
      let len = this.carouselImg.length;
      this.noAnimate = true;
      if (direction) {
        this.currentIndex = 0;
        this.currentTranslateX = (this.currentIndex + 1) / (len + 2) * 100;
      } else {
        this.currentIndex = len - 1;
        this.currentTranslateX = (this.currentIndex + 1) / (len + 2) * 100;
      }
    },
    setTimer() {
      let len = this.carouselImg.length;
      if (this.autoplay && len > 1) {
        this.timer = setTimeout(() => {
          this.noAnimate = false;
          this.hasTimer = true;
          if (this.order === 'backward') {
            this.currentIndex += 1;
            this.currentTranslateX = (this.currentIndex + 1) / (len + 2) * 100;
          } else {
            this.currentIndex -= 1;
            this.currentTranslateX = (this.currentIndex + 1) / (len + 2) * 100;
          }
          if (this.currentIndex >= len) {
            setTimeout(() => {
              this.go(true);
            }, this.interval);
          } else if (this.currentIndex <= -1) {
            setTimeout(() => {
              this.go(false);
            }, this.interval);
          } else {
            this.noAnimate = false;
          }
          this.setTimer();
        }, this.delay * 1000 + this.interval);
      }
    },
    // 当滑动的时候设置偏移量
    slid(currentIndex, pos) {
      let len = this.carouselImg.length;
      let order = pos.deltaX / pos.absX;
      if (order === 1) {
        this.currentTranslateX += pos.absX / (750 * (len + 2));
      } else {
        this.currentTranslateX -= pos.absX / (750 * (len + 2));
      }
    },
    // 滑动函数
    transitionTo(index) {
      let len = this.carouselImg.length;
      this.clearTimer();
      this.currentIndex = index;
      this.currentTranslateX = (this.currentIndex + 1) / (len + 2) * 100;
      if (this.currentIndex === len) {
        setTimeout(() => {
          this.go(true);
        }, this.interval);
      } else if (this.currentIndex === -1) {
        setTimeout(() => {
          this.go(false);
        }, this.interval);
      } else {
        this.noAnimate = false;
      }
      if (!this.hasTimer) {
        this.setTimer();
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.hasTimer = false;
      }
    },
    // 计算touch偏移量
    calculatePos(e) {
      let clientX = e.changedTouches[0].clientX;
      let clientY = e.changedTouches[0].clientY;
      let xd = this.x - clientX;
      let yd = this.y - clientY;
      let axd = Math.abs(xd);
      let ayd = Math.abs(yd);
      return {
        deltaX: xd,
        deltaY: yd,
        absX: axd,
        absY: ayd
      };
    },
    onTouchstart(e) {
      if (e.touches.length > 1) {
        return;
      }
      if (this.count === 1) {
        this.touch = false;
        return;
      }
      if (this.touch) {
        return;
      }
      this.touch = true;
      this.clearTimer();
      this.start = Date.now();
      this.x = e.touches[0].clientX;
      this.y = e.touches[0].clientY;
    },
    onTouchmove(e) {
      if (this.preventDefault) {
        e.preventDefault();
      }
      if (!this.touch) {
        return;
      }
      let pos = this.calculatePos(e);
      if (pos.absX > pos.absY) {
        e.preventDefault();
        this.slid(this.currentTranslateX, pos);
      }
    },
    onTouchend(e) {
      if (!this.touch) {
        return;
      }
      let {
 loop, start, flickThreshold, delta, currentIndex 
} = this;
      let pos = this.calculatePos(e);
      let time = Date.now() - start;
      let velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
      let isFlick = velocity > flickThreshold;
      let newIndex = currentIndex;
      if (isFlick || pos.absX > delta) {
        newIndex = newIndex + pos.absX / pos.deltaX;
      }
      this.transitionTo(newIndex);
      this.cleanTouch();
    },
    onTouchcancel() {
      if (!this.touch) {
        return;
      }
      this.transitionTo(this.currentIndex);
      this.cleanTouch();
    },
    cleanTouch() {
      this.touch = false;
    }
  },
  components: {
    DotGroup
  },
  computed: {
    computedLoop() {
      return this.carouselImg.length > 1 ? this.loop : false;
    }
  }
};
</script>

<style lang="less">
@b: 46.875rem;
.VueCarousel {
  width: 100%;
  height: 226/@b;
  position: relative;
  overflow: hidden;
  .carousel-wrapper {
    height: 226/@b;
    .carousel-item {
      width: 702/@b;
      height: 202/@b;
      padding: 0 24/@b 24/@b;
      float: left;
      .image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
