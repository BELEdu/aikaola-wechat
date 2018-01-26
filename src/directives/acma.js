import Vue from 'vue';
import { TheTopReturn } from '@/components';

const Component = Vue.extend(TheTopReturn);
const vm = new Component().$mount();

document.body.appendChild(vm.$el);

let observer = null;

const initObserver = el => new IntersectionObserver(
  (entries) => {
    const item = entries[0];
    const ratio = item.intersectionRatio;

    if (ratio < 1) {
      vm.show(el);
    } else {
      vm.hide();
    }
  },
  {
    root: el.parentElement,
    threshold: [1, 0.9],
  },
);

export default {
  inserted(el) {
    observer = initObserver(el);

    observer.observe(el.children[0]);
  },

  unbind() {
    observer.disconnect();
    vm.hide();
  },
};
