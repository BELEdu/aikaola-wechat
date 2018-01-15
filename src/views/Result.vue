<template>
  <div class="appointment-result">

    <!-- 缺省展示组件 -->
    <DefaultContent
      :is-success="isSuccess"
      :text="query.message || '暂无提示信息'"
    ></DefaultContent>

  </div>
</template>

<script>
/**
 * @desc 通用结果展示页面
 */

import { DefaultContent } from '@/components';

export default {
  name: 'Result',

  components: {
    DefaultContent,
  },

  data() {
    return {
      timer: null, // 定时器
    };
  },

  computed: {
    query() {
      return this.$route.query;
    },

    // 是否显示成功图标
    isSuccess() {
      return this.query.status !== 'error';
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
      let nowTime = totalTime; // 当前秒数

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

.appointment-result {
  height: 100%;
  width: 100%;
}
</style>
