<template>
  <div class="user-info">
    <UserInfoHeader
      :click="() => $router.push('/center/user-edition')"
      :data="user"
    />

    <div class="user-info__child-title">
      <span>我的小孩</span>
      <span
        @click="$router.push('/child-binding')"
      >+添加小孩</span>
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

import { Panel } from 'vux';
import {
  UserInfoChild,
  UserInfoHeader,
} from './components';

export default {
  name: 'UserInfo',

  components: {
    Panel,
    UserInfoChild,
    UserInfoHeader,
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

.user-info__header {
  position: relative;
  padding-top: @gutter;
  margin-bottom: @gutter;
}

.user-info__header-content {
  display: flex;
  padding: @gutter;
  background-color: #fff;
}

.user-info__header-avatar {
  flex: none;
  margin-right: 12px;
  height: 65px;
  width: 65px;
  border-radius: 5px;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }
}

.user-info__header-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span:first-of-type {
    font-size: @text-size-title;
  }

  span:last-of-type {
    font-size: @text-size-content;
    color: @text-color-subsidiary;
  }
}

.user-info__child-title {
  display: flex;
  justify-content: space-between;
  padding: 0 @gutter;

  span:first-of-type {
    color: @text-color-secondary;
  }

  span:last-of-type {
    color: @text-color-primary;
  }
}
</style>
