// vux组件引入
import { ToastPlugin } from 'vux';

// 全局样式
import '@/styles/global.less';

import Vue from 'vue';
import FastClick from 'fastclick';
import router from '@/router';
import plugins from '@/plugins';
import App from './App';

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(plugins)
  .use(ToastPlugin);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
