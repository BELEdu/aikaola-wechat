<template>
  <div
    v-if="visible"
    :value="visible"
    @input="toggleMask"
    class="mask"
  >
    <!-- 遮罩层 -->
    <div class="mask__bg" @click="closeMask"></div>


    <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
      <!-- slides -->
      <swiper-slide
        v-for="item in 6"
        :key="item"
      >
        <div class="mask__item">
          <section class="mask__wrap is-primary">
            <!-- 标签 -->
            <div class="mask__tag">待上课</div>

            <!-- 课序 -->
            <div class="mask__index">第二节课</div>

            <!-- 图标 -->
            <div class="text-center">
              <svg><use :xlink:href="`#${svgId(1)}`"/></svg>
            </div>

            <!-- 课程信息 -->
            <ul class="mask__info">
              <li>
                <b>上课时间：</b>
                <span>2018-01-24（星期六）<br>10:00-12:00</span>
              </li>
              <li>
                <b>上课科目：</b>
                <span>数学</span>
              </li>
              <li>
                <b>教师姓名：</b>
                <span>肖冰洁</span>
              </li>
              <li>
                <b>上课内容：</b>
                <p class="ellipsis">数与式、有理数....函数数与式、有理数....函数</p>
              </li>
            </ul>

            <!-- 查看更多 -->
            <router-link
              class="mask__more"
              :to="`/center/course/${studentId}/10086`"
            >查看更多</router-link>

          </section>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>

  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import '@/assets/swiper.css';

export default {
  name: 'course-mask',

  components: {
    swiper,
    swiperSlide,
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    studentId: {
      type: Number,
      required: true,
    },
    // data: {
    //   type: Array,
    //   required: true,
    // },
  },

  data() {
    return {
      // 所有的参数同 swiper 官方 api 参数
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
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
  },

  mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // eslint-disable-next-line
    console.log('this is current swiper instance object', this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },

  methods: {
    // 监听遮罩层的显示/隐藏
    toggleMask(val) {
      this.$emit('update:visible', val);
    },

    // 关闭遮罩层
    closeMask() {
      this.$emit('update:visible', false);
    },

    // 图标id
    svgId(status) {
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

.is-default {
  .colormix(@text-color-subsidiary);
}

.is-primary {
  .colormix(@primary-color);
}

.is-warning {
  .colormix(@warning-color);
}

.is-error {
  .colormix(@error-color);
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;

  &__bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color:rgba(0, 0, 0, 0.5);
  }

  &__item {
    padding: 0 10px;
    height:@item-height;
    width: @item-width;
  }

  &__wrap {
    position: relative;
    height:100%;
    width:100%;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;

    & svg {
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
    color: @primary-color;
    bottom: 20px;
    text-align: center;
    font-size: 13px;
    width: 100%;
  }
}

.mySwiper {
  position: relative;
  width: 100%;
  // background-color: red;
}
</style>
