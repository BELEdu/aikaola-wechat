import http from './http';

export default (Vue) => {
  // eslint-disable-next-line
  Vue.prototype.$http = http
};
