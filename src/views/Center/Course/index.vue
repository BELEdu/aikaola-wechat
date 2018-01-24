<template>
  <div class="course-table">

    <!-- 孩子选择菜单 -->
    <StudentSelect
      :select-id="currentId"
      :data="students"
      @on-change="changeStudent"
    />

    <!-- 日历 -->
    <CourseCalendar
      :student-id="currentId"
      :key="studentId"
    />

  </div>
</template>

<script>
/**
 * @desc 课程表
 */

import { mapState } from 'vuex';
import { CourseCalendar, CourseMask, StudentSelect } from './components';

export default {
  name: 'course-table',

  components: {
    CourseCalendar,
    CourseMask,
    StudentSelect,
  },

  data() {
    return {
      currentId: 0, // 当前选中的学员id
    };
  },

  computed: {
    ...mapState({
      students: state => state.userInfo.students,
    }),

    studentId() {
      return +this.$route.params.studentId;
    },
  },

  methods: {
    // 改变当前选中的学员
    changeStudent(id) {
      this.currentId = id;
      this.$router.replace(`/center/course/${id}`);
    },

    // 进入该页面时设置默认学员
    setDefaultStudent() {
      this.currentId = this.studentId;
    },
  },

  mounted() {

  },

  created() {
    this.setDefaultStudent();
  },
};
</script>

<style lang="less">

</style>
