<template>
  <div class="not-found">

    <!-- 缺省展示组件 -->
    <DefaultContent :is-success="false">
      <div class="text-center">
        <b>出错啦！</b><br>
        您访问的页面不存在
      </div>
    </DefaultContent>

  </div>
</template>

<script>
/**
 * @desc 404页面
 */

import { DefaultContent } from '@/components';

export default {
  name: 'not-found',

  components: {
    DefaultContent,
  },
};
</script>

<style lang="less">

.not-found {
  height: 100%;
  width: 100%;
}
</style>
