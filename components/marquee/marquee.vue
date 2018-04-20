<template>
    <div class="marquee-wrapper" :style="sty">
        <ul class="marquee" ref="list" :style="{transform: `translate3d(0,${currentTranslateY}rem,0)`, transition: `transform ${noAnimate ? 0 : duration}ms ease-in`}">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        // 内容
        listData: {
            type: Array,
            default: () => []
        },
        // 视口中可见条目
        visibleNum: {
            type: Number,
            default: 1
        },
        // 每个item的高度
        height: {
            type: Number
        },
        // 每个marquee条目间格多少换一次
        interval: {
            type: Number,
            default: 2000
        },
        // 对动画时长多少设置
        duration: {
            type: Number,
            default: 300
        },
        // 默认滚动方向
        direction: {
            type: String,
            default: 'up'
        },
        length: {
            type: Number
        }
    },
    mounted: function () {
        this.init();
    },
    beforeDestroy () {
        this.destroy();
    },
    data: () => ({
        noAnimate: false,
        currentTranslateY: 0,
        currentIndex: 0
    }),
    computed: {
        sty() {
            // 视口的高度
            let visibleHeight = this.height * this.visibleNum;
            return {
                height: `${visibleHeight}rem`
            }
        }
    },
    methods: {
        destroy() {
            this.timer && window.clearTimeout(this.timer);
        },
        init() {
            this.destroy()
            if(this.length < this.visibleNum) return
            if(this.direction === 'down') {
                this.go(false);
            }
            this.start()
        },
        start () {
            this.timer = setTimeout(() => {
                if(this.direction === 'up') {
                    this.currentIndex++
                    this.currentTranslateY = -(this.currentIndex * this.height)
                } else {
                    this.currentIndex--
                    this.currentTranslateY = -(this.currentIndex + 1) * this.height
                }
                if (this.currentIndex === this.length - this.visibleNum) {
                    setTimeout(() => {
                        this.go(true)
                    }, this.duration)
                } else if (this.currentIndex === -1 ) {
                    setTimeout(() => {
                        this.go(false)
                    }, this.duration)
                } else {
                    this.noAnimate = false
                }
                this.start();
            }, this.interval + this.duration)
        },
        go(direction) {
            this.noAnimate = true
            if(direction) {
                this.currentIndex = 0
                this.currentTranslateY = 0
            } else {
                this.currentIndex = this.length - 1 - this.visibleNum
                this.currentTranslateY = - (this.currentIndex + 1) * this.height
            }
        }
    }
}
</script>

<style lang='less'>
    .marquee-wrapper{
        overflow: hidden;
    }
</style>
