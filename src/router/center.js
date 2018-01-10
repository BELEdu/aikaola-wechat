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

    /* 课程管理 */

    {
      path: 'course-schedule',
      name: 'CourseSchedule',
      component: views.CourseSchedule,
      meta: {
        title: '课程表',
      },
    },

    {
      path: 'course-info/:childId/:couresId',
      name: 'CourseInfo',
      component: views.CourseInfo,
      meta: {
        title: '课程详情',
      },
    },

    {
      path: 'course-homework/:childId/:couresId',
      name: 'CourseHomework',
      component: views.CourseHomework,
      meta: {
        title: '上传作业',
      },
    },
  ],
};
