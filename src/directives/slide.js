/**
 * dom元素滑动方向判断指令: 当前值考虑水平方向
 *
 * 监听事件名为 @slide
 */

// 绑定该指令的多个集合，一个指令可以重复使用
const attr = {};
// touchStart 起点
const origin = { x: 0, y: 0 };
// touchEnd 终点
const terminus = { x: 0, y: 0 };

const figureVector = () => ({
  x: terminus.x - origin.x,
  y: terminus.y - origin.y,
});

const touchStart = (evt) => {
  origin.x = evt.targetTouches[0].clientX;
  origin.y = evt.targetTouches[0].clientY;
};

const touchEnd = (evt) => {
  terminus.x = evt.changedTouches[0].clientX;
  terminus.y = evt.changedTouches[0].clientY;

  const vector = figureVector();

  // 取15px最小滑动距离

  // eslint-disable-next-line
  Math.abs(vector.x) > 15
  && vector.x > 0
  && attr.right
  && attr.right.value();

  // eslint-disable-next-line
  Math.abs(vector.x) > 15
  && vector.x < 0
  && attr.left
  && attr.left.value();
};


export default {
  bind(el, binding) {
    attr[binding.arg] = binding;

    el.addEventListener('touchstart', touchStart);
    el.addEventListener('touchend', touchEnd);
  },

  unbind(el) {
    el.removeEventListener('touchstart', touchStart);
    el.removeEventListener('touchend', touchEnd);
  },
};
