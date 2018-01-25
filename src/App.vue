<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
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

  &.has-mask::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    z-index: 501;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
