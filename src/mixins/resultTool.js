/**
 * @desc 跳转结果页
 */

export default {

  methods: {
    /**
     * 跳转结果页
     *
     * @param isReplace   {Boolean} 路由是否replace，默认为true
     * @param obj         {Object} query参数对象
     * @param obj.status  {String} （'error'：失败） 默认值 'success'：成功
     * @param obj.title   {String} 页面标题
     * @param obj.message {String} 提示语文案
     * @param obj.to      {String} 自动跳转的路由地址
     * @param obj.time    {Number} 自动跳转的延迟时间（单位：秒），默认值 3
     */

    toResultPage(obj, isReplace = true) {
      const queryString = Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&');

      // 路由跳转模式
      if (isReplace) {
        this.$router.replace(`/result?${queryString}`);
      } else {
        this.$router.push(`/result?${queryString}`);
      }
    },
  },
};
