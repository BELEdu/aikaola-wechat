/**
 * 用户中心路由
 */

import * as views from '@/views';

export default {
  path: '/center',
  name: 'Center',
  component: views.Center,
  redirect: '/center/user-info',
  children: [
    /* 用户信息 */

    {
      path: 'user-info',
      name: 'UserInfo',
      component: views.UserInfo,
      meta: {
        title: '个人中心',
      },
    },

    {
      path: 'user-child/:id',
      name: 'UserChild',
      component: views.UserChild,
      meta: {
        title: '我的小孩',
      },
    },

    {
      path: 'user-edition',
      name: 'UserEdition',
      component: views.UserEdition,
      meta: {
        title: '修改资料',
      },
    },

    /* 课程管理 */

    {
      path: '/center/course',
      name: 'CenterCourse',
      component: views.CenterCourse,
      meta: {
        title: '课程表',
      },
    },

    {
      path: '/center/course/:childId/:couresId',
      name: 'CenterCourseDetail',
      component: views.CenterCourseDetail,
      meta: {
        title: '课程详情',
      },
    },

    {
      path: '/center/course/:childId/:couresId/homework',
      name: 'CenterCourseHomework',
      component: views.CenterCourseHomework,
      meta: {
        title: '上传作业',
      },
    },

  ],
};
