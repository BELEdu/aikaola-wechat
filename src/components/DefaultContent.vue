<template>
  <div class="default-content">
    <!-- 图标 -->
    <svg><use :xlink:href="`#${svgId}`" /></svg>
    <!-- 提示文案 -->
    <p>
      <slot>{{text}}</slot>
    </p>
  </div>
</template>

<script>
/**
 * 缺省信息展示组件
 * @name DefaultContent
 * @author zml
 * @param {Boolean} isSuccess - 是否使用成功的图标，默认展示失败的图标
 * @param {String} text - 提示文案
 */

export default {
  name: 'DefaultContent',

  props: {
    isSuccess: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },

  computed: {
    svgId() {
      return this.isSuccess ? 'default-success' : 'default-error';
    },
  },

};
</script>

<style lang="less">

@icon-height:150px;

.default-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  svg {
    height: @icon-height;
    width: @icon-height;
  }

  p {
    margin: 18px 0;
    font-size: @text-size-title;
    line-height: 1.75;
  }
}
</style>
