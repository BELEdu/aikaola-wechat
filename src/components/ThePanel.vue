<template>
  <div
    class="the-panel"
    @click="() => click && click()"
  >
    <div :class="{
        'right-arrow': rightArrow,
        'the-panel__content': true,
      }"
    >
      <span class="the-panel__avatar">
        <img :src="avatar">
      </span>
      <div class="the-panel__description">
        <span>{{name}}</span>
        <slot name="content"/>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
/**
 * @desc    人物信息展示组件
 * @author  hjz
 */

export default {
  name: 'ThePanel',

  props: {
    avatar: String,

    name: String,

    click: Function,

    rightArrow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less">
@gutter: 15px;

.the-panel {
  position: relative;
  padding-top: @gutter;
  margin-bottom: @gutter;
}

.the-panel__content {
  display: flex;
  padding: @gutter;
  background-color: #fff;
}

.the-panel__avatar {
  flex: none;
  margin-right: 12px;
  height: 65px;
  width: 65px;
  border-radius: 5px;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }
}

.the-panel__description {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1;
  color: @text-color-subsidiary;
  font-size: @text-size-content;

  span:first-of-type {
    font-size: @text-size-title;
    color: @text-color-default;
  }
}
</style>
