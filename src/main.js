// vux组件引入
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux';

// 全局样式
import '@/styles/global.less';
import '@/utils/devAuthorization';

import Vue from 'vue';
import FastClick from 'fastclick';
import router from '@/router';
import store from '@/store';
import plugins from '@/plugins';
import App from './App';
import * as directives from './directives';

FastClick.attach(document.body);

// 引入svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/svg', true, /\.svg$/);
requireAll(req);

Vue.config.productionTip = false;

// 注册全局指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});

Vue.use(plugins)
  .use(ToastPlugin)
  .use(LoadingPlugin)
  .use(ConfirmPlugin);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app-box');
