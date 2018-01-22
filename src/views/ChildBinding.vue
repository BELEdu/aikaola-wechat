<template>
  <div class="child-binding">
    <Group
      label-width="5em"
      gutter="15px"
    >
      <XInput
        v-model="data.student_name"
        title="学员姓名"
        placeholder="请输入姓名"
      />
      <XInput
        v-model="data.indentify_code"
        title="识别码"
        placeholder="请输入识别码"
      />
      <VerificationCode
        v-model="data.code"
        :mobile="mobile"
        label-width="5em"
      />
    </Group>
    <XButton
      class="child-binding__confirm"
      type="primary"
      :show-loading="submitLoading"
      text="确认"
      @click.native="() => v_submit()"
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
  name: 'ChildBinding',

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
      student_name: '',
      indentify_code: '',
      code: '',
    },

    rules: {
      student_name: '请填写姓名',
      indentify_code: '请填写识别码',
      code: '请输入验证码',
    },

    submitLoading: false,

    // 提交数据接口地址
    url: '/bind/bind_child',
  }),

  computed: {
    mobile() {
      return this.userInfo.phone;
    },
  },

  created() {
    this.data.mobile = this.mobile;
  },

  methods: {
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
