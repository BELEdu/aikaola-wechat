<template>
  <ViewBox class="center">
    <router-view></router-view>

    <Tabbar>
      <TabbarItem
        v-for="item in navigation"
        :key="item.path"
        :link="item.link"
        :selected="$route.path.includes(item.link)"
      >
        <span slot="icon" :class="item.icon"></span>
        <span slot="label">{{item.text}}</span>
        <span></span>
      </TabbarItem>
    </Tabbar>
  </ViewBox>
</template>

<script>
/**
 * @desc 用户主页面
 */
import { ViewBox, Tabbar, TabbarItem } from 'vux';

export default {
  name: 'User',

  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
  },

  data: () => ({
    navigation: [
      {
        icon: 'iconfont icon-course',
        link: '/center/course-schedule',
        text: '课程表',
      },
      {
        icon: 'iconfont icon-user',
        link: '/center/user-info',
        text: '个人中心',
      },
    ],
  }),
};
</script>

<style lang="less">
.center {

  .weui-tabbar__icon .iconfont::before {
    font-size: 20px;
  }
}
</style>
