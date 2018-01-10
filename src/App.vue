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

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body {
  background-color: #fbf9fe;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
