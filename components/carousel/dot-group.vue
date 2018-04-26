<template>
    <div class="dot-wrapper">
        <span class="dot-item" v-for="index in count" :key="index" @click="handleDotClick(index)" :class="{'active' : nowLocal === index - 1}"></span>
    </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number
    },
    nowLocal: {
      type: Number
    }
  },
  methods: {
    handleDotClick(index) {
      // this.$emit('dotClick', index - 1);
    }
  }
}
</script>

<style lang="less">
.dot-wrapper {
  position: absolute;
  left: 0;
  bottom: 34px;
  font-size: 0;
  width: 100%;
  height: 5px;
  text-align: center;
  z-index: 99;
  .dot-item {
    display: inline-block;
    width: 20px;
    height: 5px;
    margin: 0 8px;
    background: rgba(0, 0, 0, 0.08);
  }
  .active {
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
