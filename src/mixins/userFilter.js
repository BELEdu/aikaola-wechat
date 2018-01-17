/**
 * @desc    用户绑定、孩子绑定前置过滤
 * @author  hjz
 */
import store from '@/store';

export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },

    from() {
      return this.$route.query.from;
    },
  },

  beforeRouteEnter(to, from, next) {
    if (!store.state.userInfo) {
      next('/center/user-info');
    } else {
      next();
    }
  },
};
