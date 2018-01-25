<template>
  <div
    v-if="mask"
    class="app-mask"
    @click="closeMask"
  ></div>
</template>

<script>
/**
 * @description 公共遮罩层组件
 * @author zml
 */
import { mapState } from 'vuex';
import store from '@/store';

export default {
  name: 'app-mask',

  computed: {
    ...mapState({
      mask: state => state.mask,
    }),
  },

  methods: {
    closeMask() {
      store.commit('updateMask', false);
    },
  },
};
</script>

<style lang="less">
.app-mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 501;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
