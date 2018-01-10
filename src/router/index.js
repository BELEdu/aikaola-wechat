import Vue from 'vue';
import Router from 'vue-router';
// 路由组件
import * as views from '@/views';
// 路由模块
import appointment from './appointment';
import center from './center';

const COMPANY = '爱考拉家校互通';

Vue.use(Router);

const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      redirect: '/center',
    },
    {
      path: '/signup',
      name: 'Signup',
      component: views.Signup,
      meta: {
        title: '登录',
      },
    },

    {
      path: '/child-binding',
      name: 'ChildBinding',
      component: views.ChildBinding,
      meta: {
        title: '绑定学员',
      },
    },

    ...appointment,

    center,
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = COMPANY;
  }
  next();
});

export default router;
