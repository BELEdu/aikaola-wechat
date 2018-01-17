<template>
  <div class="center">
    <ViewBox>

      <router-view></router-view>

      <Tabbar slot="bottom">
        <TabbarItem
          v-for="item in navigation"
          :key="item.path"
          :link="item.link"
          :selected="$route.path.includes(item.link)"
        >
          <svg slot="icon" class="center__svg">
            <use :xlink:href="`#${item.svgId}`" />
          </svg>
          <span slot="label">{{item.text}}</span>
          <span></span>
        </TabbarItem>
      </Tabbar>

      <BackTop v-if="false"></BackTop>

    </ViewBox>
  </div>
</template>

<script>
/**
 * @desc 用户主页面
 */
import { ViewBox, Tabbar, TabbarItem } from 'vux';
import { BackTop } from '@/components';

export default {
  name: 'User',

  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    BackTop,
  },

  data: () => ({
    navigation: [
      {
        svgId: 'course-table',
        link: '/center/course',
        text: '课程表',
      },
      {
        svgId: 'user',
        link: '/center/user-info',
        text: '个人中心',
      },
    ],
  }),
};
</script>

<style lang="less">

@svg-height:20px;

.center {
  height: 100%;

  &__svg {
    height: @svg-height;
    width: @svg-height;
    margin-top: 2px;
    fill: @text-color-secondary;
  }

  .weui-tabbar__label{
    color:  @text-color-secondary;
  }

  .weui-bar__item_on {
    svg {
      fill: @primary-color;
    }
  }
}
</style>
