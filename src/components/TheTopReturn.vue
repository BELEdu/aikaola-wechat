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
    returnTop() {
      const container = this.el.parentElement;

      const scrollTop = `translate(0, ${container.scrollTop}px)`;

      const animation = this.el.animate(
        [
          { transform: 'translate(0)' },
          { transform: scrollTop },
        ], 500);

      animation.onfinish = () => {
        container.scrollTop = 0;
      };
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
