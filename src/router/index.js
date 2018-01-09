import Vue from 'vue';
import Router from 'vue-router';
// 路由组件
import * as views from '@/views';
// 路由模块
import appointment from './appointment';
import center from './center';

Vue.use(Router);

export default new Router({
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
    },

    {
      path: '/child-binding',
      name: 'ChildBinding',
      component: views.ChildBinding,
    },

    ...appointment,

    center,
  ],
});
