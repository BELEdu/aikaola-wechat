/**
 * @desc 预约管理路由
 */

import * as views from '@/views';

export default [
  {
    path: '/test-appointment',
    name: 'TestAppointment',
    component: views.Appointment,
  },
  {
    path: '/course-appointment',
    name: 'CourseAppointment',
    component: views.Appointment,
  },
  {
    path: '/appointment-success',
    name: 'AppointmentSuccess',
    component: views.AppointmentSuccess,
  },
  {
    path: '/appointment-failure',
    name: 'AppointmentFailure',
    component: views.AppointmentFailure,
  },
];
