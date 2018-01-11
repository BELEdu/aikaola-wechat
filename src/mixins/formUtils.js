/**
 * @desc 表单工具混入
 * @desc 验证部分：当前仅支持字段填写验证
 *
 * @author hjz
 */

export default {

  methods: {
    /**
     * @desc 表单验证
     *
     * @param   data  {Object}  表单数据
     * @param   rules {Object}  键名和data相同的信息描述
     */
    validateForm(data, rules) {
      const result = Object.keys(rules)
        .every(key => this.validateProp(data[key], rules[key]));

      return result;
    },

    /**
     * @desc 字段值校验
     *
     * @param   value   字段对应值
     * @param   mse     验证失败信息
     */
    validateProp(value, msg) {
      if (!value) this.$vux.toast.text(msg);

      return !!value;
    },

    /**
     * @desc 后端错误信息提示
     */
    alertError(msg) {
      this.$vux.toast.text(msg);
    },
  },
};
