<template>
  <div
    v-show="visible"
    @click="returnTop"
    class="the-top-return"
  >
    <svg><use xlink:href="#arrows-up" /></svg>
    <div>顶部</div>
  </div>
</template>

<script>
/**
 * 页面滚动会顶部组件
 *
 * @author hjz & zml
 */

export default {
  name: 'TheTopReturn',

  data: () => ({
    visible: false,

    el: null,
  }),

  methods: {
    returnTop({
      container = this.el.parentElement,
      distance = container.scrollTop,
      // 滚动次数
      frequrence = 300 / (1000 / 60),
      // 每帧自然滚动距离
      delta = distance / frequrence,
    } = {}) {
      const position = distance > delta ? distance - delta : 0;

      // eslint-disable-next-line
      container.scrollTop = position;

      if (position) {
        requestAnimationFrame(
          () => this.returnTop({
            distance: position,
            frequrence: frequrence - 1,
          }),
        );
      }
    },

    show(target) {
      this.visible = true;
      this.el = target;
    },

    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less">

@wrap-width:40px;
@svg-width:22px;

.the-top-return {
  position: fixed;
  right: 15px;
  bottom: 50px + 15px;
  z-index: 9;
  height: @wrap-width;
  width: @wrap-width;
  background-color: #fff;
  border:1px solid @text-color-subsidiary;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
  text-align: center;

  svg {
    margin-top: 4px;
    height: @svg-width * 0.625;
    width: @svg-width;
    fill:@text-color-default;
  }

  & > div {
    transform:scale(0.9);
  }
}
</style>
