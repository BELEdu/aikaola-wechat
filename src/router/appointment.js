/**
 * @desc 预约管理路由
 */

import * as views from '@/views';

export default [
  {
    path: '/appointment/:type', // type（test：智能测试，course：课程试听）
    name: 'TestAppointment',
    component: views.Appointment,
  },
  {
    path: '/appointment/:type/:status',
    name: 'AppointmentResult',
    component: views.AppointmentResult,
  },
];
