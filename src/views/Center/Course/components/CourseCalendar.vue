<template>
  <div class="calender">

    <!-- 头部月历显示 -->
    <div
      class="calender__header"
      @click="popup.active = true"
    >
      <span>{{calendarYearMonth}}</span>
      <svg><use xlink:href="#arrows-down" /></svg>
    </div>

    <!-- 日历 -->
    <InlineCalendar
      v-model="date.value"
      ref="myCalendar"
      class="calendar"
      hide-header
      highlight-weekend
      :replace-text-list="replaceTextList"
      @on-change="onChange"
      @on-view-change="onViewChange"
    />

    <!-- 四种状态 Tips -->
    <div class="calender__footer">
      <span
        v-for="(status,index) in courseStatus"
        :key="index"
      >
        <i class="dot" :class="status.class"></i>
        <span>{{ status.name }}</span>
      </span>
    </div>

    <!-- 渲染月份选择器 -->
    <Popup v-model="popup.active">
      <PopupHeader
        title="请选择月份"
        left-text="取消"
        right-text="确定"
        @on-click-left="popupToggle(false)"
        @on-click-right="popupToggle(true)"
      />
      <DatetimeView
        ref="datetime"
        v-model="popup.value"
        format='YYYY-MM'
      />
    </Popup>

    <!-- 课程详情轮播图 -->
    <CourseMask
      :studentId="studentId"
      :visible.sync="mask.visible"
    ></CourseMask>

  </div>
</template>

<script>
/**
 * @desc 课程表组件
 */
import {
  dateFormat,
  InlineCalendar,
  DatetimeView,
  Popup,
  PopupHeader,
} from 'vux';

import CourseMask from './CourseMask';

export default {
  name: 'course-calender',

  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },

  components: {
    InlineCalendar,
    DatetimeView,
    Popup,
    PopupHeader,
    CourseMask,
  },

  data() {
    return {
      // 当月课程数据
      courseData: [],

      // 课程状态数据
      courseStatus: [
        { class: 'dot--error', name: '缺勤' },
        { class: 'dot--warning', name: '已评价', course_status: 3 },
        { class: 'dot--primary', name: '已上课', course_status: 2 },
        { class: 'dot--default', name: '待上课', course_status: 1 },
      ],

      date: {
        value: '', // 当前选中的日期
        year: '', // 年
        month: '', // 月
        firstCurrentMonthDate: '', // 该选中日期月份的月头
        lastCurrentMonthDate: '', // 该选中日期月份的月末
      },

      popup: {
        value: '', // 月份选择器的值，格式 2018-12
        active: false, // 月份选择器控制
      },

      mask: {
        visible: false, // 遮罩层控制
      },

      // 替换文本
      replaceTextList: { TODAY: '今' },
    };
  },

  computed: {
    // 今天日期
    today() {
      return dateFormat(new Date(), 'YYYY-MM-DD');
    },

    // 当前日历的渲染年月
    calendarYearMonth() {
      return `${this.date.year} 年 ${this.date.month} 月`;
    },

    courseIdArray() {
      return this.courseData.map(course => course.id) || [];
    },
  },

  methods: {
    /**
     * 渲染月份变化时触发
     * 初始化时会触发一次
     * 如果不希望处理初始化时的触发，可以检查第二个参数是否为 0
     */
    onViewChange(data, index) {
      // eslint-disable-next-line
      console.log(data, index);

      const {
        year,
        month,
        firstCurrentMonthDate,
        lastCurrentMonthDate,
      } = data;

      this.date = {
        ...this.date,
        year,
        month,
        firstCurrentMonthDate,
        lastCurrentMonthDate,
      };

      this.dateTimeRender(year, month);
      this.getCourseData(firstCurrentMonthDate, lastCurrentMonthDate);
    },

     // 渲染特定年月日期
    switchViewToMonth(year, month) {
      this.$refs.myCalendar.switchViewToMonth(year, month);
    },

    // 获取课程信息
    getCourseData(firstDate, lastDate) {
      const api = `/course/class_schedule/${this.studentId}?between[course_date][]=${firstDate}&between[course_date][]=${lastDate}`;
      this.$http.get(api)
      .then((res) => {
        // eslint-disable-next-line
        console.log(res);
        this.courseData = res;
      });
    },

    // 弹窗控制
    popupToggle(ok) {
      if (ok) {
        const year = this.popup.value.slice(0, 4);
        const month = this.popup.value.slice(5, 7);
        this.switchViewToMonth(+year, +month);
      }
      this.popup.active = false;
    },

    // 渲染月份选择器
    dateTimeRender(year, month) {
      this.popup.value = `${year}-${month < 10 ? `0${month}` : month}`;
      this.$refs.datetime.render();
    },

    onChange(val) {
      // eslint-disable-next-line
      console.log(val);
      this.mask.visible = true;
    },

  },

  created() {

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
  margin-bottom: 10px;

  .inline-calendar {

    & th {
      color: @text-color-default;
      font-size: 13px;
      line-height: 30px;
    }

    & td {
      width: 50px;
      height: 50px;
      font-size: 14px;
      padding: 0;
      font-weight: bold;

      &.is-today {
        font-size: 15px;
        font-weight: normal;
        color: @primary-color;
      }

      &.is-week-0 , &.is-week-6 {
        color: @warning-color;
      }

      &.is-disabled {
        color: @text-color-subsidiary;
      }

      &.current {
        & > span.vux-calendar-each-date {
          background-color: #F0F8FE;
          color: @text-color-secondary !important;
        }

        &.is-week-0 > span.vux-calendar-each-date , &.is-week-6 > span.vux-calendar-each-date{
          color: @warning-color !important;
        }

        &.is-today > span.vux-calendar-each-date {
          color: @primary-color !important;
        }
      }

      & > span.vux-calendar-each-date {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 50px;
        border-radius: 0%;
        text-align: center;
        border: 1px solid transparent;
        box-sizing: border-box;
      }
    }

  }

  &__header {
    padding: 15px;
    line-height: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &>span {
      font-size: 13px;
    }

    & svg {
      margin-left: 10px;
      height: 12px;
      width: 12px;
      fill: @text-color-secondary;
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
