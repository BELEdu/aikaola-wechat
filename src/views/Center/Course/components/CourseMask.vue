<template>
  <div class="mask">

    <!-- 透明点击区域 -->
    <div class="mask__bg" @click="closeMask"></div>

    <!-- swuper插件 -->
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      class="mySwiper"
    >
      <!-- slides -->
      <swiper-slide
        v-for="(course,index) in courseArray"
        :key="index"
      >
        <section
          class="mask__wrap"
          :class="{[`${theme(course.course_status,course.is_attend)}`]:true}"
        >
          <!-- 标签 -->
          <div class="mask__tag">{{course.is_attend === 0 ?'缺勤':course.course_status_name}}</div>

          <!-- 课序 -->
          <div class="mask__index">第 {{course.sort_value}} 节课</div>

          <!-- 图标 -->
          <div class="text-center">
            <svg class="mask__wrap__svg"><use :xlink:href="`#${svgId(course.course_status,course.is_attend)}`"/></svg>
          </div>

          <!-- 课程信息 -->
          <ul class="mask__info">
            <li>
              <b>上课时间：</b>
              <span>
                {{course.week}}
                <br>{{course.course_start_end}}
              </span>
            </li>
            <li>
              <b>上课科目：</b>
              <span>{{course.subject}}</span>
            </li>
            <li>
              <b>教师姓名：</b>
              <span>{{course.teacher_name}}</span>
            </li>
            <li>
              <b>上课内容：</b>
              <p class="ellipsis">{{course.wechat_chapter_name}}</p>
            </li>
          </ul>

          <!-- 查看更多 -->
          <router-link
            v-if="showMore(course.course_status)"
            class="mask__more"
            :to="`/center/course/${studentId}/${course.id}`"
          >
            查看更多
            <svg><use xlink:href="#arrows-right"/></svg>
          </router-link>

        </section>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import store from '@/store';
import '@/assets/swiper.css';

export default {
  name: 'course-mask',

  components: {
    swiper,
    swiperSlide,
  },

  props: {
    studentId: {
      type: Number,
      required: true,
    },
    course: {
      type: Object,
      required: true,
    },
    currentDate: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      /**
       * @description swiper参数配置
       * 所有的参数同 swiper 官方 api 参数
       * http://www.swiper.com.cn/api/index.html
       * https://github.com/surmon-china/vue-awesome-swiper
       */
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    // 当前月份所有课程组成的数组
    courseArray() {
      return this.course.data
        .reduce((acc, course) => [...acc, ...course.data], []) || [];
    },
  },

  mounted() {
    this.slideToFirstCourse();
  },

  methods: {
    // 滚动到当前日期的第一节课
    slideToFirstCourse() {
      const slideIndex = this.courseArray
       .findIndex(course => course.date === this.currentDate);
      this.swiper.slideTo(slideIndex, 500, false);
    },

    // 关闭弹窗
    closeMask() {
      store.commit('updateMask', false);
    },

    // 是否可以展示 “查看更多”
    showMore(status) {
      switch (status) {
        case 1:
          return true;
        case 2:
          return true;
        case 3:
          return true;
        default:
          return false;
      }
    },

    // 图标id
    svgId(status, isAttend) {
      // 如果该学员是缺勤，则一律返回error样式
      if (isAttend === 0) {
        return 'course-error';
      }
      switch (status) {
        case 1:
          return 'course-wait';
        case 2:
          return 'course-success';
        case 3:
          return 'course-comment';
        default:
          return 'course-error';
      }
    },

    // 卡片主题
    theme(status, isAttend) {
      if (isAttend === 0) {
        return 'is-error';
      }
      switch (status) {
        case 1:
          return 'is-primary';
        case 2:
          return 'is-success';
        case 3:
          return 'is-warning';
        default:
          return 'is-error';
      }
    },
  },

};
</script>

<style lang="less">

@tag-width: 70px;
@item-height: 370px;
@item-width: 72vw;
@svg-width: 85px;

.colormix(@color){
  border: 1px solid @color;
  .mask__tag {
    background-color: @color;
  }
}

.is-primary {
  .colormix(@primary-color);
}

.is-success {
  .colormix(@success-color);
}

.is-warning {
  .colormix(@warning-color);
}

.is-error {
  .colormix(@error-color);
}

.mask {
  position: fixed;
  z-index: 502;
  align-items: center;
  display: flex;
  top: 0;
  bottom:0;
  left: 0;
  right: 0;

  &__bg {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  &__wrap {
    position: relative;
    height:@item-height;
    width: @item-width;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;

    &__svg {
      height: @svg-width;
      width: @svg-width;
      margin-top: 25px;
    }
  }

  &__tag {
    position: absolute;
    height: @tag-width;
    width: @tag-width;
    right: calc(-@tag-width / 2);
    top: calc(-@tag-width / 2);
    background-color: @primary-color;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: #fff;
    transform:rotate(45deg);
  }

  &__index {
    line-height: 1;
    margin-top: 25px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
  }

  &__info {
    margin: 10px 0 0 0;
    padding: 0 15px;
    list-style: none;

    & > li {
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 12px;
      display: flex;

      & > b {
        flex-shrink: 0;
      }
    }
  }

  &__more {
    position: absolute;
    line-height: 1;
    color: @text-color-subsidiary;
    bottom: 20px;
    font-size: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 2px;
      height: 12px;
      width: 12px;
      fill: @text-color-subsidiary;
    }
  }
}

.mySwiper {
  .swiper-slide {
    width: @item-width;
  }
}
</style>
