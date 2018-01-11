<template>
  <ViewBox id="app">
    <router-view></router-view>
  </ViewBox>
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
}
</style>
