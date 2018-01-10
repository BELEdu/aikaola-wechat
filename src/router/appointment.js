/**
 * @desc 预约管理路由
 */

import * as views from '@/views';

export default [
  {
    path: '/test-appointment',
    name: 'TestAppointment',
    component: views.Appointment,
    meta: {
      title: '智能测试',
    },
  },
  {
    path: '/course-appointment',
    name: 'CourseAppointment',
    component: views.Appointment,
    meta: {
      title: '课程试听',
    },
  },
  {
    path: '/appointment-success',
    name: 'AppointmentSuccess',
    component: views.AppointmentSuccess,
    meta: {
      title: '预约成功',
    },
  },
  {
    path: '/appointment-failure',
    name: 'AppointmentFailure',
    component: views.AppointmentFailure,
    meta: {
      title: '预约失败',
    },
  },
];
