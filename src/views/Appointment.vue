<template>
  <ViewBox class="appointment">
    <Group label-width="5em">

      <!-- 学员姓名 -->
      <XInput
        v-model="form.student_name"
        title="学员姓名"
        placeholder="请输入学员姓名"
        :max="10"
        required
      />

      <!-- 手机号码 -->
      <XInput
        v-model="form.phone"
        title="手机号码"
        placeholder="请输入手机号码"
        keyboard="number"
        :min="11"
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
            v-model="form.grade"
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
            v-model="form.subject"
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
        <span :class="{'appointment__text': !!form.date}">
          {{ form.date === '' ? '请选择时间' : form.date}}
        </span>
      </Cell>

      <!-- 隐藏的选择日期组件，用show.sync控制 -->
      <Datetime
        v-show="false"
        title="隐藏的选择日期组件"
        v-model="form.date"
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
  dateFormat,
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
        student_name: '',
        phone: '',
        grade: [],
        subject: [],
        date: '',
      },

      // 校验文案
      rules: {
        student_name: '请输入学员姓名',
        phone: '请输入手机号码',
        grade: '请选择年级',
        subject: '请选择至少一个学科',
        date: '请选择时间',
      },

      // 弹出菜单控制器
      active: {
        grade: false,
        subjects: false,
        datetime: false,
      },

      gradeData: [],
      subjectsData: [],
    };
  },

  computed: {
    // 年级文本
    gradeText() {
      const selectedGrade = this.form.grade;
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
      const selectedSubjects = this.form.subject;
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
      return dateFormat(new Date(), 'YYYY-MM-DD');
    },

    // 预约类型是否是"智能测试"
    isTypeTest() {
      return this.$route.params.type === 'test';
    },

    // 手机号格式是否正确
    isPhone() {
      const reg = /^1\d{10}$/;
      return reg.test(this.form.phone);
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
      this.form.date = this.currentDate;
    },

    // 提交前校验
    beforeSubmit() {
      // 通用校验mixin
      const validRequired = this.validateForm(this.form, this.rules);

      if (validRequired) {
        if (this.isPhone) {
          this.submit();
        } else {
          this.$vux.toast.text('请输入正确的手机号码');
        }
      }
    },

    // 提交表单
    submit() {
      // 处理表单数据
      const data = {
        ...this.form,
        grade: this.form.grade[0],
      };

      // 接口地址
      const api = `/reservation/${this.isTypeTest ? 'store_exam' : 'store_schedule'}`;

      this.$http.post(api, data)
        .then(() => {
          this.isResultSuccess(true);
        })
        .catch((error) => {
          if (error.status === 400) {
            this.isResultSuccess(false, error.message);
          } else {
            throw error;
          }
        })
        .catch(this.alertError);
    },

    /**
     * @desc 表单提交结果后续处理
     * @param isSuccess {Boolean} 是否成功
     * @param message   {String} 错误展示文案
     */
    isResultSuccess(isSuccess, message = '不好意思，您的预约出错') {
      this.toResultPage({
        status: isSuccess ? 'success' : 'error',
        title: isSuccess ? '预约成功' : '预约失败',
        message: isSuccess ? `${this.isTypeTest ? MODULE_TEST : MODULE_COURSE}预约成功` : message,
        // to: '/appointment/test',
        // time: 3,
      });
    },

    // 获年级 & 学科取数据源
    getBeforeData() {
      this.$http.get('/reservation/store_before')
      .then(({ grade, subject }) => {
        this.gradeData = this.changeOptionData(grade);
        this.subjectsData = this.changeOptionData(subject);
      })
      .catch(({ message }) => {
        this.alertError(message);
      })
      .then(() => {
        this.hideLoading();
      });
    },

    // 变换数据结构
    changeOptionData(myArray) {
      return myArray.map(item => ({
        key: item.value,
        value: item.display_name,
      }));
    },

  },

  created() {
    this.getBeforeData();
  },

  beforeRouteEnter(to, from, next) {
    document.title = to.params.type === 'test' ? '智能测试' : '课程试听';
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
