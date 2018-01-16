<template>
  <div class="user-child">
    <ThePanel
      v-slide:left="() => slideCourse(1)"
      v-slide:right="() => slideCourse(-1)"
      :avatar="data.avatar"
      :name="data.name"
    >
      <span slot="content">
        课程名称：{{course.name}}
      </span>
      <span slot="content">
        剩余课时：{{course.rest}}小时
      </span>

      <SwiperIndicator
        :value="courseIndex"
        :length="data.courses.length"
      />
    </ThePanel>

    <div
      class="user-child__evaluations"
    >
      <UserChildEvaluation
        v-for="rate in course.rates"
        :key="rate.date"
        :data="rate"
      />
    </div>
  </div>
</template>

<script>
/**
 * @desc 个人中心 - 孩子信息
 */
import { slide } from '@/directives';

import {
  SwiperIndicator,
  ThePanel,
} from '@/components';

import { UserChildEvaluation } from './components';

export default {
  name: 'UserChild',

  components: {
    SwiperIndicator,
    ThePanel,
    UserChildEvaluation,
  },

  directives: {
    slide,
  },

  data: () => ({
    courseIndex: 0,

    data: {
      avatar: 'http://img3.imgtn.bdimg.com/it/u=885192807,544676424&fm=27&gp=0.jpg',
      name: '包着海苔的饭',
      courses: [
        {
          name: '小学五年级奥数基础班',
          rest: 3,
          rates: Array(10).fill(
            {
              teacher: '肖冰洁',
              date: '2017-12-24',
              test: 'balabala...balabala.',
            },
          ),
        },
        {
          name: '小学六年级英语基础班',
          rest: 10,
          rates: Array(10).fill(
            {
              teacher: '南山南',
              date: '2017-12-24',
              test: 'balabala...balabala.',
            },
          ),
        },
      ],
    },
  }),

  computed: {
    course() {
      return this.data.courses[this.courseIndex];
    },
  },

  methods: {
    slideCourse(step) {
      const len = this.data.courses.length;

      const index = this.courseIndex + step;

      const valid = index >= 0 && index < len;

      if (valid) this.courseIndex = index;
    },
  },
};
</script>

<style lang="less">
@gutter: 15px;

.user-child-evaluation:not(:last-child) {
  border-bottom: 1px solid @bd-color-base;
}

.user-child__evaluations {
  background-color: #fff;
  margin-bottom: @gutter;
}
</style>
