<template functional>
  <div
    v-if="props.length > 1"
    class="swiper-indicator"
  >
    <span
      v-for="i in props.length"
      :key="i"
      :class="[
        'swiper-indicator-dot',
        i - 1 === props.value && 'active'
      ]"
    ></span>
  </div>
</template>

<script>
/**
 * @desc 轮播指示组件
 */

export default {
  name: 'SwiperIndicator',

  props: {
    value: Number,

    length: Number,
  },
};
</script>

<style lang="less">
@gutter: 15px;

.swiper-indicator {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: @gutter;
}

.swiper-indicator-dot {
  height: 6px;
  width: 6px;
  margin: 2px;
  border-radius: 3px;
  background-color: #d0cdd1;
}

.swiper-indicator-dot.active {
  background-color: @primary-color;
}
</style>
