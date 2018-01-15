<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { ViewBox } from 'vux';

export default {
  name: 'app',

  components: {
    ViewBox,
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;

  &::before {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
  }
}
</style>
