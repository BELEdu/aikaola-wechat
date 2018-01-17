<template>
  <div class="child-binding">
    <Group
      label-width="5em"
      gutter="15px"
    >
      <XInput
        ref="name"
        v-model="data.name"
        title="学员姓名"
        placeholder="请输入姓名"
      />
      <XInput
        v-model="data.identifier"
        title="识别码"
        placeholder="请输入识别码"
      />
      <VerificationCode
        v-model="data.code"
        telphone="11111"
        url="www"
        label-width="5em"
      />
    </Group>
    <XButton
      class="child-binding__confirm"
      type="primary"
      :show-loading="submitLoading"
      text="确认"
      @click.native="v_submit"
    />
  </div>
</template>

<script>
/**
 * @desc 家长绑定小孩
 * @author hjz
 */
import {
  formUtils,
  userFilter,
} from '@/mixins';

import {
  VerificationCode,
} from '@/components';

import {
  Group,
  XButton,
  XInput,
} from 'vux';

export default {
  name: 'Signup',

  components: {
    Group,
    VerificationCode,
    XButton,
    XInput,
  },

  mixins: [
    formUtils,
    userFilter,
  ],

  data: () => ({
    data: {
      name: '',
      identifier: '',
      code: '',
    },

    rules: {
      name: '请填写姓名',
      identifier: '请填写识别码',
      code: '请输入验证码',
    },

    submitLoading: false,
  }),

  methods: {
    v_submit() {
      const valid = this.validateForm(this.data, this.rules);

      if (valid) this.submit();
    },

    submit() {
      this.directRoute();
    },

    directRoute() {
      const to = this.from || '/center/user-info';

      this.$router.replace(to);
    },
  },
};
</script>

<style lang="less">
.child-binding {

  .child-binding__confirm {
    margin-top: 30px;
    width: calc(~"100% - 30px");
  }
}
</style>
