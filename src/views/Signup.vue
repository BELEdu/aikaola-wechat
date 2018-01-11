<template>
  <div class="signup">
    <Group
      label-width="4em"
      gutter="15px"
    >
      <XInput
        ref="name"
        v-model="data.name"
        title="姓名"
        placeholder="请输入姓名"
      />
      <XInput
        ref="telphone"
        v-model="data.telphone"
        title="手机"
        placeholder="请输入手机号"
      />
      <XInput
        ref="code"
        v-model="data.code"
        title="验证码"
        placeholder="请输入验证码"
      >
        <XButton
          class="signup__codebtn"
          slot="right"
          type="primary"
          :show-loading="codebtnLoading"
          :disabled="showCounter"
          @click.native="v_requestCode"
          mini
        >
          <span v-show="showCounter && !codebtnLoading">
            <Countdown
              v-model="counter"
              @on-finish="vm_countOver"
            />s
          </span>
          <span v-show="!showCounter && !codebtnLoading">
            获取验证码
          </span>
        </XButton>
      </XInput>
    </Group>
    <XButton
      class="signup__confirm"
      type="primary"
      :show-loading="submitLoading"
      text="绑定登录"
      @click.native="v_submit"
    />
  </div>
</template>

<script>
/**
 * @desc 个人信息注册
 * @author hjz
 */

import {
  Countdown,
  Group,
  XButton,
  XInput,
} from 'vux';

export default {
  name: 'Signup',

  components: {
    Countdown,
    Group,
    XButton,
    XInput,
  },

  data: () => ({
    data: {
      name: '',
      telphone: '',
      code: '',
    },

    rules: {
      name: '请填写姓名',
      telphone: '请填写手机号码',
      code: '请输入验证码',
    },

    submitLoading: false,

    codebtnLoading: false,

    showCounter: false,

    counter: 10,
  }),

  methods: {
    v_submit() {
      const valid = this.validateForm(this.data, this.rules);

      if (valid) this.submit();
    },

    validateForm(data, rules) {
      const result = Object.keys(data)
        .every(key => this.checkProp(data[key], rules[key]));

      return result;
    },

    validateProp(value, msg) {
      if (!value) this.$vux.toast.text(msg);

      return !!value;
    },

    v_requestCode() {
      const valid = this.validateProp(
        this.data.telphone,
        this.rules.telphone,
      );

      if (valid) this.m_requestCode();
    },

    m_requestCode() {
      this.codebtnLoading = true;

      setTimeout(() => {
        this.codebtnLoading = false;
      }, 1000);

      this.showCounter = true;
    },

    vm_countOver() {
      this.showCounter = false;
      this.counter = 10;
    },

    submit() {
      this.$router.push('/child-binding');
    },
  },
};
</script>

<style lang="less">
.signup {

  .signup__confirm {
    margin-top: 30px;
    width: calc(~"100% - 30px");
  }

  input::placeholder {

  }

  .signup__codebtn {
    box-sizing: content-box;
    min-width: 5em;
  }
}
</style>
