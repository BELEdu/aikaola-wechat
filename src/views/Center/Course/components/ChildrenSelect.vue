<template>
  <div class="children-select">
    <a
      v-for="(child,index) in data"
      :key="index"
      @click="onChange(child.id)"
      :class="{'active':(child.id === selectId)}"
    >
      <!-- 透明遮罩层 -->
      <div
        v-if="child.id !== selectId"
        class="children-select__mask"
      ></div>

      <!-- 头像 -->
      <img
        v-img-src="child.avatar"
        :alt="child.name"
      >

      <!-- 姓名 -->
      <p class="ellipsis">{{child.name}}</p>
    </a>
  </div>
</template>

<script>

export default {
  name: 'children-select',

  props: {
    selectId: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onChange(id) {
      this.$emit('on-change', id);
    },
  },

};
</script>

<style lang="less">

@child-wrap: calc(~"(100vw - 10px) / 5");
@avatar-width: calc(~"((100vw - 10px) / 5) - 12px");

.children-select {
  margin: 10px 0;
  background-color: #fff;
  padding: 10px 5px;
  display: flex;

  & > a {
    position: relative;
    display: inline-block;
    width: @child-wrap;
    text-align: center;
    line-height: 1;

    img {
      height: @avatar-width;
      width: @avatar-width;
      max-height: 80px;
      max-width: 80px;
      border: 1px solid @bd-color-base;
      background-color: @text-color-subsidiary;
      fill: @text-color-secondary;
    }

    p {
      color: @text-color-subsidiary;
      font-size: 15px;
      margin-top: 8px;
    }

    &.active {
      img {
        border: 1px solid @primary-color;
      }

      p {
        color: @text-color-default;
      }
    }
  }

  &__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5)
  }
}
</style>
