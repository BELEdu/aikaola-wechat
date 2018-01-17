<template>
  <div class="back-top">
    <svg><use xlink:href="#arrows-up" /></svg>
    <div>顶部</div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less">

@wrap-width:40px;
@svg-width:22px;

.back-top {
  position: fixed;
  right: 15px;
  bottom: 50px + 15px;
  z-index: 9;
  height: @wrap-width;
  width: @wrap-width;
  background-color: #fff;
  border:1px solid @text-color-subsidiary;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
  text-align: center;

  svg {
    margin-top: 4px;
    height: @svg-width * 0.625;
    width: @svg-width;
    fill:@text-color-default;
  }

  & > div {
    transform:scale(0.9);
  }
}
</style>
