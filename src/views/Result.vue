<template>
  <div class="appointment-result">

    <img
      v-if="query.status === 'error'"
      :src="require('@/assets/appointment-error.png')"
      alt="失败图标"
    >
    <img
      v-else
      :src="require('@/assets/appointment-success.png')"
      alt="成功图标"
    >

    <p>{{query.message || '暂无提示信息'}}</p>

  </div>
</template>

<script>
/**
 * @desc 通用结果展示页面
 */

export default {
  name: 'Result',

  data() {
    return {
      timer: null, // 定时器

      time: null,
    };
  },

  computed: {
    query() {
      return this.$route.query;
    },
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    // 在关闭页面前关闭定时器和loading
    beforeClose() {
      clearInterval(this.timer);
      this.$vux.loading.hide();
    },

    // 开启定时器
    startTimer() {
      const path = this.query.to;
      const totalTime = +this.query.time || 4; // 默认倒计时4s
      let nowTime = totalTime;

      // 如果query有跳转路由的参数，则开启定时器
      if (path) {
        this.timer = setInterval(() => {
          if (nowTime > 1) {
            nowTime -= 1;
            this.$vux.loading.show({
              text: `跳转中... ${nowTime}s`,
            });
          } else {
            this.beforeClose();
            this.$router.replace(path);
          }
        }, 1000);
      }
    },
  },

  beforeDestroy() {
    this.beforeClose();
  },

  beforeRouteEnter(to, from, next) {
    const title = to.query.title;
    document.title = title || '结果页';
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
    margin: 25px 0;
    font-size: @text-size-title;
    line-height: 1;
  }
}
</style>
