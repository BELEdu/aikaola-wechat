<template functional>
  <div class="user-info-child-evaluation">
    <div class="clamp">
      <div class="clamp-content">{{props.content}}</div>
      <div class="clamp-placeholder"></div>
      <div class="clamp-sticky">
        <span>{{props.sticky}}</span>
      </div>
      <div class="clamp-ellipsis">
        ...
        <span>{{props.ellipsis}}</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc    用户中心 - 孩子评价
 * @author  hjz
 */

export default {
  name: 'UserInfoChildEvaluation',

  props: {
    content: {
      type: String,
      require: true,
    },

    ellipsis: String,

    sticky: String,
  },
};
</script>

<style lang="less">
@line-height: 1.5em;
@ellipsis-width: 7em;

.user-info-child-evaluation {
  width: 100%;

  .clamp {
    position:relative;
    max-height: calc(@line-height * 2);
    width: 100%;
    line-height: @line-height;
    overflow: hidden;
  }

  .clamp-content {
    float: right;
    margin-left: calc(@ellipsis-width * -1);
    width: 100%;
  }

  .clamp-placeholder {
    float: right;
    width: @ellipsis-width;
    height: calc(@line-height * 2);
    color: transparent;
  }

  .clamp-sticky {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .clamp-ellipsis {
    float: right;
    position: relative;
    left: 100%;
    height: @line-height;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.7) 0%, white 30%);
    transform: translate(-100%, -100%);
  }

  .clamp-sticky,
  .clamp-ellipsis {
    width: @ellipsis-width;
    text-align: right;
    display: inline-block;

    >span {
      font-size: @text-size-subsidiary;
    }
  }
}
</style>
