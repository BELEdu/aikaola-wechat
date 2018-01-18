<template>
  <div class="course-table">

    <!-- 孩子选择菜单 -->
    <ChildrenSelect
      :select-id="currentId"
      :data="children"
      @on-change="changeChild"
    />

    <!-- 日历 -->
    <CourseCalendar />

  </div>
</template>

<script>
/**
 * @desc 课程表
 */
import { CourseCalendar, CourseMask, ChildrenSelect } from './components';

export default {
  name: 'course-table',

  components: {
    CourseCalendar,
    CourseMask,
    ChildrenSelect,
  },

  data() {
    return {
      currentId: 1, // 当前选中的孩子id

      children: [
        {
          id: 1,
          name: '张学员',
          avatar: 'https://static.vux.li/uploader_bg.png',
        },
        {
          id: 2,
          name: '李学员',
          avatar: 'https://static.vux.li/uploader_bg.png',
        },
        {
          id: 3,
          name: '斯琴高娃',
          avatar: 'https://static.vux.li/uploader_bg.png',
        },
        {
          id: 4,
          name: '尼古拉夫斯基',
          avatar: '',
        },
        {
          id: 5,
          name: '小明',
          avatar: 'https://static.vux.li/uploader_bg.png',
        },
      ],

    };
  },

  computed: {

  },

  methods: {
    // 改变当前选中的孩子
    changeChild(id) {
      this.currentId = id;
    },
  },
};
</script>

<style lang="less">

</style>
