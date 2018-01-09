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
    },

    {
      path: 'user-child/:id',
      name: 'UserChild',
      component: views.UserChild,
    },

    /* 课程管理 */

    {
      path: 'course-schedule',
      name: 'CourseSchedule',
      component: views.CourseSchedule,
    },

    {
      path: 'course-info/:childId/:couresId',
      name: 'CourseInfo',
      component: views.CourseInfo,
    },

    {
      path: 'course-homework/:childId/:couresId',
      name: 'CourseHomework',
      component: views.CourseHomework,
    },
  ],
};
