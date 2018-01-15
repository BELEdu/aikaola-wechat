/**
 * @desc 页面初始化加载Loading
 */

export default {

  methods: {
    /**
     * 显示loading
     * @param {String} 提示文字 -
     */
    showLoading(text) {
      this.$vux.loading.show({
        text: text || '加载中...',
      });
    },

    // 隐藏loading
    hideLoading() {
      this.$vux.loading.hide();
    },
  },

  created() {
    this.showLoading();
  },
};
