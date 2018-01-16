// vux组件引入
import { ToastPlugin, LoadingPlugin } from 'vux';

// 全局样式
import '@/styles/global.less';

import Vue from 'vue';
import FastClick from 'fastclick';
import router from '@/router';
import plugins from '@/plugins';
import App from './App';

FastClick.attach(document.body);

// 引入svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/svg', true, /\.svg$/);
requireAll(req);

Vue.config.productionTip = false;

Vue.use(plugins)
  .use(ToastPlugin)
  .use(LoadingPlugin);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
