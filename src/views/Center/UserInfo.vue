<template>
  <div class="user-info">
    <ThePanel
      :click="() => $router.push('/center/user-edition')"
      :avatar="user.avatar"
      :name="user.name"
      right-arrow
    >
      <span slot="content">{{user.phone}}</span>
    </ThePanel>

    <div class="user-info__child-bar">
      <span>我的小孩</span>
      <span
        @click="$router.push('/child-binding')"
      ><svg><use xlink:href="#plus"/></svg> 添加小孩</span>
    </div>

<<<<<<< HEAD
    <UserInfoChild
      @click.native="$router.push('/center/user-child/1')"
      :data="childInfo"
    />
=======
    <div
      v-for="i in 2"
      :key="i"
      class="user-info__child-card"
      @click="$router.push('/center/user-child/1')"
    >
      <div class="user-info__child-card__title">
        <span>
          <img src="http://img3.imgtn.bdimg.com/it/u=885192807,544676424&fm=27&gp=0.jpg">
        </span>
        <span>王小明</span>
      </div>
      <div
        v-for="i in 2"
        :key="i"
        class="right-arrow user-info__child-card__content"
      >
        <div>课程名称：小学五年级奥数基础班</div>
        <div>剩余课时：3课时</div>
        <div>
          <span>剩余评价：</span>
          <span>
            <UserInfoChildEvaluation
              :content="childInfo.rate"
              :ellipsis="childInfo.date"
              :sticky="childInfo.date"
            />
          </span>
        </div>
      </div>
    </div>
>>>>>>> feat(SVG):将项目的字体图标都替换为svg格式
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
