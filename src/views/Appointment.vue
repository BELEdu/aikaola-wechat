<template>
  <ViewBox class="appointment">
    <Group label-width="5em">

      <!-- 学员姓名 -->
      <XInput
        v-model="form.myName"
        title="学员姓名"
        placeholder="请输入学员姓名"
        required
      />

      <!-- 手机号码 -->
      <XInput
        ref="myMoible"
        v-model="form.myMoible"
        title="手机号码"
        placeholder="请输入手机号码"
        keyboard="number"
        :max="11"
        required
      />

      <!-- 预约年级 -->
      <Cell
        title="预约年级"
        value-align="left"
        is-link
        @click.native="activeToggle('grade')"
      >
        <span :class="{'appointment__text': !!gradeText}">
          {{ gradeText || '请选择年级' }}
        </span>
      </Cell>

      <!-- 选择年级弹出菜单 -->
      <Popup
        v-model="active.grade"
      >
        <PopupHeader
          title="请选择年级"
        />
        <Group
          gutter="0"
          class="appointment__poupup"
        >
          <Checklist
            v-model="form.myGrade"
            :max="1"
            :options="gradeData"
            label-position="right"
            @on-change="changeGrade"
          />
        </Group>
      </Popup>

      <!-- 预约学科 -->
      <Cell
        title="预约学科"
        value-align="left"
        is-link
        @click.native="activeToggle('subjects')"
      >
        <span :class="{'appointment__text': !!subjectsText}">
          {{ subjectsText || '请选择学科（可多选）' }}
        </span>
      </Cell>

      <!-- 选择学科弹出菜单 -->
      <Popup v-model="active.subjects">
        <PopupHeader
          title="请选择学科（可多选）"
          left-text="取消"
          right-text="确定"
          :show-bottom-border="false"
          @on-click-left="activeToggle('subjects')"
          @on-click-right="activeToggle('subjects')"
        />
        <Group gutter="0">
          <Checklist
            v-model="form.mySubjects"
            :options="subjectsData"
            label-position="right"
          />
        </Group>
      </Popup>

      <!-- 预约时间 -->
      <Cell
        title="预约时间"
        value-align="left"
        is-link
        @click.native="active.datetime = true"
      >
        <span :class="{'appointment__text': !!form.myDate}">
          {{ form.myDate === '' ? '请选择时间' : form.myDate}}
        </span>
      </Cell>

      <!-- 隐藏的选择日期组件，用show.sync控制 -->
      <Datetime
        v-show="false"
        title="隐藏的选择日期组件"
        v-model="form.myDate"
        format="YYYY-MM-DD"
        year-row="{value}年"
        month-row="{value}月"
        day-row="{value}日"
        clear-text="今天"
        :show.sync="active.datetime"
        :start-date="currentDate"
        @on-clear="setToday"
      />

    </Group>

    <div class="appointment__button">
      <XButton
        type="primary"
        @click.native="beforeSubmit"
      >立即预约</XButton>

      <XButton
        @click.native="isResultSuccess(true)"
      >成功</XButton>

      <XButton
        @click.native="isResultSuccess(false)"
      >失败</XButton>
    </div>
  </ViewBox>
</template>

<script>
/**
 * @desc 预约 - 立即预约
 */

import {
  XInput,
  Group,
  XButton,
  Cell,
  Checklist,
  Popup,
  PopupHeader,
  Datetime,
  ViewBox,
} from 'vux';

import { formUtils, resultTool, loadingTool } from '@/mixins';

const MODULE_TEST = '智能测试';
const MODULE_COURSE = '课程试听';

export default {
  name: 'Appointment',

  mixins: [formUtils, resultTool, loadingTool],

  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Checklist,
    Popup,
    PopupHeader,
    Datetime,
    ViewBox,
  },

  data() {
    return {
      // 表单
      form: {
        myName: '',
        myMoible: '',
        myGrade: [],
        mySubjects: [],
        myDate: '',
      },

      rules: {
        myName: '请输入学员姓名',
        myMoible: '请输入手机号码',
        myGrade: '请选择年级',
        mySubjects: '请选择至少一个学科',
        myDate: '请选择时间',
      },

      // 弹出菜单控制器
      active: {
        grade: false,
        subjects: false,
        datetime: false,
      },

      gradeData: [{
        key: 1,
        value: '小学一年级',
      }, {
        key: 2,
        value: '小学二年级',
      }, {
        key: 3,
        value: '小学三年级',
      }, {
        key: 4,
        value: '小学四年级',
      }, {
        key: 5,
        value: '小学五年级',
      }, {
        key: 6,
        value: '小学六年级',
      }, {
        key: 7,
        value: '初中一年级',
      }, {
        key: 8,
        value: '初中二年级',
      }, {
        key: 9,
        value: '初中三年级',
      }, {
        key: 10,
        value: '高中一年级',
      }, {
        key: 11,
        value: '高中二年级',
      }, {
        key: 12,
        value: '高中三年级',
      }],

      subjectsData: [{
        key: 1,
        value: '数学',
      }, {
        key: 2,
        value: '物理',
      }, {
        key: 3,
        value: '化学',
      }, {
        key: 4,
        value: '英语',
      }],
    };
  },

  computed: {
    // 年级文本
    gradeText() {
      const selectedGrade = this.form.myGrade;
      if (selectedGrade.length > 0) {
        return this.gradeData
          .filter(grade => selectedGrade.includes(grade.key))
          .map(grade => grade.value)
          .join('，');
      }
      return false;
    },

    // 学科文本
    subjectsText() {
      const selectedSubjects = this.form.mySubjects;
      if (selectedSubjects.length > 0) {
        return this.subjectsData
          .filter(subject => selectedSubjects.includes(subject.key))
          .map(subject => subject.value)
          .join('，');
      }
      return false;
    },

    // 今天的日期
    currentDate() {
      const now = new Date();
      const cyear = now.getFullYear();
      let cmonth = now.getMonth() + 1;
      let cday = now.getDate();
      if (cmonth < 10) {
        cmonth = `0${cmonth}`;
      }
      if (cday < 10) {
        cday = `0${cday}`;
      }
      return `${cyear}-${cmonth}-${cday}`;
    },

    // 预约类型是否是"智能测试"
    isTypeTest() {
      return this.$route.params.type === 'test';
    },
  },

  methods: {
    // 打开/关闭弹出菜单
    activeToggle(item) {
      this.active[item] = !this.active[item];
    },

    // 选中年级时关闭弹出菜单
    changeGrade() {
      if (this.active.grade) {
        this.activeToggle('grade');
      }
    },

    // 将日期设置为今天
    setToday() {
      this.form.myDate = this.currentDate;
    },

    // 提交前校验
    beforeSubmit() {
      // 通用校验mixin
      const validRequired = this.validateForm(this.form, this.rules);

      if (validRequired) {
        this.submit();
      }
    },

    // 提交表单
    submit() {
      const data = {
        ...this.form,
        myGrade: this.form.myGrade[0],
      };

      // eslint-disable-next-line
      console.log(data);
    },

    // 表单提交结果后续处理
    isResultSuccess(RightWrong) {
      const isSuccess = RightWrong;
      this.toResultPage({
        status: isSuccess ? 'success' : 'error',
        title: isSuccess ? '预约成功' : '预约失败',
        message: isSuccess ? `${this.isTypeTest ? MODULE_TEST : MODULE_COURSE}预约成功` : '您已预约，请勿重复预约',
        to: '/appointment/test',
        time: 3,
      });
    },
  },

  created() {
    this.hideLoading();
  },

  beforeRouteEnter(to, from, next) {
    if (to.params.type === 'test') {
      document.title = '智能测试';
    } else {
      document.title = '课程试听';
    }
    next();
  },
};
</script>

<style lang="less">
.appointment {
  &__button {
    padding: 15px;
  }

  &__text {
    color:@text-color-default;
  }

  &__poupup {
    height: 250px;
    overflow-y: scroll;
  }

  .weui-cell__ft {
    color: @text-color-subsidiary;
  }
}
</style>
