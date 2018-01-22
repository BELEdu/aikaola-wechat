/**
 * @desc    用户绑定、孩子绑定前置过滤
 * @author  hjz
 */
import store from '@/store';

export default {
  data: () => ({
    submitLoading: false,
  }),

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

  methods: {
    v_submit(url = this.url) {
      const valid = this.validateForm(this.data, this.rules);

      if (valid) this.submit(url);
    },

    submit(url) {
      this.submitLoading = true;

      this.$http.post(url, this.data)
        .then(() => this.$store.dispatch('initUser'))
        .then(this.directRoute)
        .catch(this.alertError)
        .then(() => { this.submitLoading = false; });
    },
  },
};
