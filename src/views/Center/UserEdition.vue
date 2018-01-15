<template>
  <div class="user-edition">
    <Group
      label-width="3em"
      gutter="15px"
    >
      <XInput
        ref="name"
        v-model="data.name"
        title="姓名"
        :style="{
          color: fontColor,
        }"
        :show-clear="false"
        @on-focus.once="fontColor = ''"
      />
    </Group>
    <XButton
      class="user-edition__confirm"
      type="primary"
      :show-loading="submitLoading"
      text="确认"
      @click.native="v_submit"
    />
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 修改资料
 * @author  hjz
 */
import {
  Group,
  XButton,
  XInput,
} from 'vux';

import {
  formUtils,
} from '@/mixins';


export default {
  name: 'UserEdition',

  components: {
    Group,
    XButton,
    XInput,
  },

  mixins: [
    formUtils,
  ],

  data: () => ({
    data: {
      name: '包着海苔的饭',
    },

    rules: {
      name: '请填写姓名',
    },

    submitLoading: false,

    fontColor: '#b2b2b2',
  }),

  methods: {
    v_submit() {
      const valid = this.validateForm(this.data, this.rules);

      if (valid) this.submit();
    },

    submit() {
      this.$router.replace('/center');
    },
  },
};
</script>

<style lang="less">
.user-edition {

  .user-edition__confirm {
    margin-top: 30px;
    width: calc(~"100% - 30px");
  }
}
</style>
