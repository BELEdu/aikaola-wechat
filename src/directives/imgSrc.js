/**
 * 图片链接指令
 * @author zml
 * @version 2018/01/18
 */

// 默认图片
import DefaultSvg from '@/assets/avatar-default.svg';

const getSrc = (el, binding) => {
  const lastSrc = binding.value;

  // 这里还需要优化判断条件
  if (lastSrc) {
    return lastSrc;
  }

  return DefaultSvg;
};

export default {
  name: 'img-src',

  bind(el, binding) {
    const srcDom = el;
    srcDom.src = getSrc(el, binding);
  },

  inserted() {

  },

  update(el, binding) {
    const srcDom = el;
    srcDom.src = getSrc(el, binding);
  },
};
