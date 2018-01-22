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
      <span v-if="loading">获取中...</span>
      <span v-else-if="showCounter && !loading">
        <Countdown
          :value="counter"
          @on-finish="vm_countOver"
        />s
      </span>
      <span v-else>
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
    mobile: {
      type: String,
      required: true,
    },

    // 获取验证码接口地址
    url: {
      type: String,
      default: '/bind/send_code',
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
        this.mobile,
        '请输入手机号码',
      );

      if (valid) this.m_requestCode();
    },

    m_requestCode() {
      this.loading = true;

      this.$http.post(this.url, { mobile: this.mobile })
        .then(() => { this.showCounter = true; })
        .catch(this.alertError)
        .then(() => { this.loading = false; });
    },

    vm_countOver() {
      this.showCounter = false;
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
