<template>
  <div class="right-arrow user-info__child__content">
    <div>课程名称：{{data.product_name}}</div>
    <div>剩余课时：{{data.remain_total}}课时</div>
    <div
      v-if="data.new_comment"
      class="user-info__child__content-rate"
    >
      <span>课堂评价：</span>
      <span>
        <UserInfoChildEvaluation
          :content="data.new_comment"
          :ellipsis="data.new_comment_date"
          :sticky="data.new_comment_date"
        />
      </span>
    </div>
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 用户信息 - 孩子卡片 - 产品卡片
 * @author  hjz
 */
import UserInfoChildEvaluation from './UserInfoChildEvaluation';

export default {
  name: 'UserInfoChildCourse',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  components: {
    UserInfoChildEvaluation,
  },
};
</script>

<style lang="less">

</style>
