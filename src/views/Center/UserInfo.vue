<template>
  <div class="user-info">
    <ThePanel
      :click="() => $router.push('/center/user-edition')"
      :avatar="userAvatar"
      :name="userInfo.name"
      right-arrow
    >
      <span slot="content">手机：{{userInfo.phone}}</span>
    </ThePanel>

    <div class="user-info__child-bar">
      <span>我的小孩</span>
      <span
        @click="$router.push('/child-binding')"
      >
        <svg><use xlink:href="#plus"/></svg>添加小孩
      </span>
    </div>

    <UserInfoChild
      v-for="child in userInfo.students"
      :key="child.id"
      :data="child"
    />
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 用户信息
 * @author  hjz
 */

import { mapState } from 'vuex';
import { ThePanel } from '@/components';
import defaultAvatar from '@/assets/avatar-default.svg';
import { UserInfoChild } from './components';

export default {
  name: 'UserInfo',

  components: {
    ThePanel,
    UserInfoChild,
  },

  computed: {
    ...mapState(['userInfo']),
    userAvatar() {
      return this.userInfo.headimgurl || defaultAvatar;
    },
  },
};
</script>

<style lang="less">
@gutter: 15px;

.user-info {
  overflow: auto;
}

.user-info__child-bar {
  display: flex;
  justify-content: space-between;
  padding: 0 @gutter;

  span:first-of-type {
    color: @text-color-secondary;
  }

  span:last-of-type {
    color: @text-color-primary;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
      fill: @primary-color;
    }
  }
}
</style>
