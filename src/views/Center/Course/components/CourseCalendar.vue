<template>
  <div class="calender">

    <!-- 头部月历显示 -->
    <div class="calender__header">
      <div class="right-arrow left-arrow">2018年1月</div>
    </div>

    <InlineCalendar
      v-model="value"
      ref="calendar"
      class="calendar"
      hide-header
      highlight-weekend
      :replace-text-list="replaceTextList"
    ></InlineCalendar>

    <div class="calender__footer">
      <span
        v-for="(status,index) in courseStatus"
        :key="index"
      >
        <i class="dot" :class="status.class"></i>
        <span>{{ status.name }}</span>
      </span>
    </div>

    <!-- {{today}} -->

  </div>
</template>

<script>
/**
 * @desc 课程表组件
 */
import { InlineCalendar, dateFormat } from 'vux';

export default {
  name: 'course-calender',

  components: {
    InlineCalendar,
  },

  data() {
    return {
      // 课程状态数据
      courseStatus: [
        { class: 'dot--error', name: '缺勤' },
        { class: 'dot--warning', name: '已评价' },
        { class: 'dot--primary', name: '已上课' },
        { class: 'dot--default', name: '待上课' },
      ],

      value: '',
      replaceTextList: { TODAY: '今' },
    };
  },

  computed: {
    today() {
      return dateFormat(new Date(), 'YYYY-MM-DD');
    },
  },
};
</script>

<style lang="less">
.dot {
  height: 8px;
  width: 8px;
  background-color: #000;
  border-radius: 50%;

  &--error {
    background-color: @error-color;
  }

  &--warning {
    background-color: @warning-color;
  }

  &--primary {
    background-color: @primary-color;
  }

  &--default {
    background-color: @text-color-secondary;
  }
}

.calender {
  background-color: #fff;

  &__header {
    padding: 14px 0;
    line-height: 1;
    text-align: right;

    & > div {
      display: inline-block;
      padding: 0 30px;
      font-size: 13px;
    }
  }

  &__footer {
    padding: 14px 14px;
    line-height: 1;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      margin-left: 15px;

      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
