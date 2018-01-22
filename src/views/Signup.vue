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
        v-model="data.mobile"
        title="手机"
        placeholder="请输入手机号"
      />
      <VerificationCode
        v-model="data.code"
        :mobile="data.mobile"
      />
    </Group>
    <XButton
      class="signup__confirm"
      type="primary"
      :show-loading="submitLoading"
      text="绑定登录"
      @click.native="() => v_submit()"
    />
  </div>
</template>

<script>
/**
 * @desc 个人信息注册
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
      mobile: '',
      code: '',
    },

    rules: {
      name: '请填写姓名',
      mobile: '请填写手机号码',
      code: '请输入验证码',
    },

    // 提交数据的后端接口地址
    url: '/bind/bind_phone',
  }),

  methods: {
    directRoute() {
      const to = this.userInfo.students.length
        ? this.from
        : `/child-binding?from=${this.from}`;

      this.$router.replace(to);
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
}
</style>
