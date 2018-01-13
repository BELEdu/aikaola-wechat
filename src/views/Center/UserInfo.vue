<template>
  <div class="user-info">
    <Panel
      class="user-info__user"
      :list="[{
        src: 'http://img3.imgtn.bdimg.com/it/u=885192807,544676424&fm=27&gp=0.jpg',
        title: '包着海苔的饭',
        desc: '13711112222',
      }]"
      type="5"
    />

    <div class="user-info__child-title">
      <span>我的小孩</span>
      <span
        @click="$router.push('/child-binding')"
      >+添加小孩</span>
    </div>

    <div
      v-for="i in 2"
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
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 用户信息
 * @author  hjz
 */

import { Panel } from 'vux';
import UserInfoChildEvaluation from './components/UserInfoChildEvaluation';

export default {
  name: 'UserInfo',

  components: {
    Panel,
    UserInfoChildEvaluation,
  },

  data: () => ({
    childInfo: {
      rate: '明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真啊，明明很认真',
      date: '2018-01-12',
    },
  }),
};
</script>

<style lang="less">
@gutter: 15px;

.user-info__user {
  padding-top: @gutter;
  margin-bottom: @gutter;
  background-color: transparent !important;

  .weui-panel__bd {
    background-color: #fff;
  }

  .weui-media-box__hd {
    height: 65px !important;
    width: 65px !important;
    border-radius: 5px;
    overflow: hidden;
  }

  .weui-media-box__title {
    font-size: @text-size-title;
  }

  .weui-media-box__desc {
    font-size: @text-size-content;
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

.user-info__child-card {
  margin: @gutter 0;
  padding-left: @gutter;
  background-color: #fff;
}

.user-info__child-card__title {
  display: flex;
  align-items: center;
  padding: 10px 0;

  span:first-of-type {
    margin-right: 10px;
    height: 36px;
    width: 36px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  span:last-of-type {
    font-size: @text-size-title;
  }
}

.user-info__child-card__content {
  position: relative;
  border-top: 1px solid @bd-color-base;
  padding: @gutter 2.5em @gutter 0;
  padding-left: 0;
  font-size: @text-size-content;
  color: @text-color-secondary;

  >div:last-of-type {
    display: flex;
    width: 100%;

    span:first-of-type {
      flex-shrink: 0;
    }

    span:last-of-type {
      flex-grow: 1;
    }
  }
}
</style>
