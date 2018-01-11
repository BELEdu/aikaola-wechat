<template>
  <div class="appointment-result">

    <img
      v-if="isSuccess"
      :src="require('@/assets/appointment-success.png')"
      alt="预约成功"
    >
    <img
      v-else
      :src="require('@/assets/appointment-error.png')"
      alt="预约失败"
    >

    <p v-if="isSuccess">{{typeName}}预约成功</p>
    <p v-else>您已预约，请勿重复预约</p>

  </div>
</template>

<script>
/**
 * @desc 预约 - 预约成功
 */

export default {
  name: 'AppointmentResult',

  computed: {
    isSuccess() {
      return this.$route.params.status === 'success';
    },

    isTest() {
      return this.$route.params.type === 'test';
    },

    typeName() {
      return this.isTest ? '智能测试' : '课程试听';
    },
  },

  beforeRouteEnter(to, from, next) {
    if (to.params.status === 'success') {
      document.title = '预约成功';
    } else {
      document.title = '预约失败';
    }
    next();
  },
};
</script>

<style lang="less">

@icon-height:150px;

.appointment-result {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    height: @icon-height;
    width: @icon-height;
  }

  p {
    margin-top: 25px;
    font-size: 18px;
    line-height: 1;
  }
}
</style>
