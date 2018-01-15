<template>
  <div class="user-info__child">
    <div class="user-info__child__title">
      <span><img :src="data.avatar"></span>
      <span>{{data.name}}</span>
    </div>
    <div
      v-for="course in data.courses"
      :key="course.name"
      class="right-arrow user-info__child__content"
    >
      <div>课程名称：{{course.name}}</div>
      <div>剩余课时：{{course.time}}课时</div>
      <div class="user-info__child__content-rate">
        <span>剩余评价：</span>
        <span>
          <UserInfoChildEvaluation
            :content="course.rate"
            :ellipsis="course.date"
            :sticky="course.date"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 用户信息 - 孩子卡片
 * @author  hjz
 */
import UserInfoChildEvaluation from './UserInfoChildEvaluation';

export default {
  name: 'UserInfoChild',

  components: {
    UserInfoChildEvaluation,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less">
@gutter: 15px;

.user-info__child {
  margin: @gutter 0;
  padding-left: @gutter;
  background-color: #fff;
}

.user-info__child__title {
  display: flex;
  align-items: center;
  padding: 10px 0;

  span:first-of-type {
    margin-right: 10px;
    height: 36px;
    width: 36px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  span:last-of-type {
    font-size: @text-size-title;
  }
}

.user-info__child__content {
  position: relative;
  border-top: 1px solid @bd-color-base;
  padding: @gutter 2.5em @gutter 0;
  padding-left: 0;
  font-size: @text-size-content;
  color: @text-color-secondary;
}

.user-info__child__content-rate {
  display: flex;
  width: 100%;

  span:first-of-type {
    flex-shrink: 0;
  }

  span:last-of-type {
    flex-grow: 1;
  }
}
</style>
