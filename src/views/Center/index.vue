<template>
  <div class="center">
    <ViewBox>

      <router-view></router-view>

      <Tabbar slot="bottom" v-show="!mask">
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

      <BackTop v-if="false"/>

      <AppMask/>

    </ViewBox>
  </div>
</template>

<script>
/**
 * @desc 用户主页面
 *
 * @author hjz
 */

import {
  ViewBox,
  Tabbar,
  TabbarItem,
} from 'vux';

import { mapState } from 'vuex';
import { BackTop, AppMask } from '@/components';
import store from '@/store';

export default {
  name: 'User',

  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    BackTop,
    AppMask,
  },

  computed: {
    ...mapState({
      students: state => state.userInfo.students,
      mask: state => state.mask,
    }),

    // 默认选择第一个学员的id
    defaultStudentId() {
      return this.students[0].id;
    },

    // nav参数配置
    navigation() {
      return [
        {
          svgId: 'course-table',
          link: `/center/course/${this.defaultStudentId}`,
          text: '课程表',
        },
        {
          svgId: 'user',
          link: '/center/user-info',
          text: '个人中心',
        },
      ];
    },
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch('initUser')
      .then((res) => {
        const source = to.path;
        const hasChild = res.students.length;

        const query = `?from=${source}`;

        next();

        if (!res.phone) {
          next(`/signup${query}`);
        } else if (!hasChild) {
          next(`/child-binding${query}`);
        } else {
          next();
        }
      });
  },
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
