<template functional>
  <div
    class="user-info__header"
    @click="props.click"
  >
    <div class="right-arrow user-info__header-content">
      <span class="user-info__header-avatar">
        <img :src="props.data.avatar">
      </span>
      <div class="user-info__header-desc">
        <span>{{props.data.name}}</span>
        <span>{{props.data.phone}}</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 用户信息 - 个人卡片
 * @author  hjz
 */

export default {
  name: 'UserInfoHeader',

  props: {
    data: {
      type: Object,
      required: true,
    },

    click: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="less">

</style>
