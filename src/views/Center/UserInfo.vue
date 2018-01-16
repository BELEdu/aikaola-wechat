<template>
  <div class="user-info">
    <ThePanel
      :click="() => $router.push('/center/user-edition')"
      :avatar="user.avatar"
      :name="user.name"
      right-arrow
    >
      <span slot="content">手机：{{user.phone}}</span>
    </ThePanel>

    <div class="user-info__child-bar">
      <span>我的小孩</span>
      <span
        @click="$router.push('/child-binding')"
      ><svg><use xlink:href="#plus"/></svg> 添加小孩</span>
    </div>

    <UserInfoChild
      @click.native="$router.push('/center/user-child/1')"
      :data="childInfo"
    />
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 用户信息
 * @author  hjz
 */

import { ThePanel } from '@/components';

import { UserInfoChild } from './components';

export default {
  name: 'UserInfo',

  components: {
    ThePanel,
    UserInfoChild,
  },

  data: () => ({
    user: {
      avatar: 'http://img3.imgtn.bdimg.com/it/u=885192807,544676424&fm=27&gp=0.jpg',
      name: '包着海苔的饭',
      phone: 13711112222,
    },

    childInfo: {
      avatar: 'http://img3.imgtn.bdimg.com/it/u=885192807,544676424&fm=27&gp=0.jpg',
      name: '王小明',
      courses: [
        {
          rate: '明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真',
          date: '2018-01-12',
          time: 3,
        },
        {
          rate: '明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真',
          date: '2018-01-12',
          time: 3,
        },
      ],
    },
  }),
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
