<template>
  <XInput
    class="verification-code"
    :value="value"
    @input="code => $emit('input', code)"
    title="验证码"
    placeholder="请输入验证码"
    :label-width="labelWidth"
  >
    <XButton
      class="verification-code__fetch"
      slot="right"
      type="primary"
      :show-loading="loading"
      :disabled="showCounter"
      @click.native="v_requestCode"
      mini
    >
      <span v-show="showCounter && !loading">
        <Countdown
          v-model="counter"
          @on-finish="vm_countOver"
        />s
      </span>
      <span v-show="!showCounter && !loading">
        获取验证码
      </span>
    </XButton>
  </XInput>
</template>

<script>
import {
  Countdown,
  XButton,
  XInput,
} from 'vux';

import {
  formUtils,
} from '@/mixins';

export default {
  name: 'VerificationCode',

  components: {
    Countdown,
    XButton,
    XInput,
  },

  mixins: [
    formUtils,
  ],

  props: {
    value: {
      type: String,
      required: true,
    },

    // 接收验证码的手机
    telphone: {
      type: String,
      required: true,
    },

    // 获取验证码接口地址
    url: {
      type: String,
      required: true,
    },

    // 独立设置标签宽度
    labelWidth: String,
  },

  data: () => ({
    loading: false,

    showCounter: false,

    counter: 10,
  }),

  methods: {
    v_requestCode() {
      const valid = this.validateProp(
        this.telphone,
        '请输入手机号码',
      );

      if (valid) this.m_requestCode();
    },

    m_requestCode() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 1000);

      this.showCounter = true;
    },

    vm_countOver() {
      this.showCounter = false;
      this.counter = 10;
    },
  },
};
</script>

<style lang="less">
.verification-code {

  .verification-code__fetch {
    box-sizing: content-box;
    min-width: 5em;
  }
}
</style>
