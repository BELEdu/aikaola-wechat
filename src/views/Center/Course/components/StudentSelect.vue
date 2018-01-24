<template>
  <div class="student-select">
    <a
      v-for="(student,index) in data"
      :key="index"
      @click="onChange(student.id)"
      :class="{'active':(student.id === selectId)}"
    >
      <!-- 透明遮罩层 -->
      <div
        v-if="student.id !== selectId"
        class="student-select__mask"
      ></div>

      <!-- 头像 -->
      <img
        v-img-src="student.head_url"
        :alt="student.display_name"
      >

      <!-- 姓名 -->
      <p class="ellipsis">
        {{student.display_name}}
      </p>

    </a>
  </div>
</template>

<script>

export default {
  name: 'student-select',

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

@student-wrap: calc(~"(100vw - 10px) / 5");
@avatar-width: calc(~"((100vw - 10px) / 5) - 12px");

.student-select {
  margin: 10px 0;
  background-color: #fff;
  padding: 10px 5px;
  display: flex;

  & > a {
    position: relative;
    display: inline-block;
    width: @student-wrap;
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
