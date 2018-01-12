<template>
  <div class="course-detail">

    <!-- 头部 -->
    <div class="course-detail__header">

      <!-- 课程和教师信息 -->
      <div class="course-detail__meta">
        <Divider>
          <b>数学速算与巧算</b>
          <div class="course-detail__meta__small">教师：肖冰洁</div>
        </Divider>
      </div>

      <div class="course-detail__action">
        <!-- 上传作业 -->
        <router-link :to="`${currenRoutetPath}/homework`">
          <i class="iconfont icon-upload"></i>
          <span>上传作业</span>
        </router-link>

        <!-- 课件预览 -->
        <a @click="pptPopup">
          <i class="iconfont icon-ppt-active"></i>
          <span>课件预览</span>
        </a>
      </div>
    </div>

    <!-- 内容 -->
    <div class="course-detail__body">

      <!-- 教学评价 -->
      <div class="course-detail__comment">
        <div class="course-detail__comment__wrap">
          <h5>评价内容</h5>
          <div class="course-detail__comment__lefticon">
            <i class="iconfont icon-marks-left"></i>
          </div>
          <div class="course-detail__comment__righticon">
            <i class="iconfont icon-marks-right"></i>
          </div>
          <p>李园园上课能认真听讲，积极回答老师问题，对知识点吸收能力很强；李园园上课会有一些小动作，我们会在教学期间积极引导她做好改善。</p>
        </div>
      </div>

      <!-- 教案区域 -->
      <section class="course-detail__section">
        <div v-for="i in 4" :key="i">
          <p>教学目标：</p>
          <p>1.使学生初步理解速算与巧算的技巧</p>
          <p>2.简单运用凑整的方法进行运算</p>
          <p>3.培养学生的观察能力、以及学生的变通能力</p>
          <p>重点：凑整的思想</p>
          <p>难点：理解凑整中的补数的运用</p>
        </div>
      </section>

    </div>

    <!-- 课件预览弹出菜单 -->
    <Popup v-model="active">
      <PopupHeader
        title="请选择课件"
      />
      <Group gutter="0">
        <cell
          v-for="( item,index ) in pptList"
          :key="index"
          :title="item.display_name"
          is-link
          @click.native="pptPreview(item.url)"
        ></cell>
      </Group>
    </Popup>
  </div>
</template>

<script>
/**
 * @desc 课程详情
 */
import {
  Divider,
  Popup,
  PopupHeader,
  Group,
  Cell,
} from 'vux';

export default {
  name: 'CourseDetail',

  components: {
    Divider,
    Popup,
    PopupHeader,
    Group,
    Cell,
  },


  data() {
    return {
      active: false,

      pptList: [
        {
          display_name: '《如何和孩子有效沟通》1116-涂老师2',
          url: 'http://oa-statics.caihonggou.com/data/ppts/5a28ed32786f0/index.html',
        },
        {
          display_name: '一年级奥数移多补少1',
          url: 'http://oa-statics.caihonggou.com/data/ppts/5a28ed32786f0/index.html',
        },
        {
          display_name: '四年级奥数拓展课程奇思巧解',
          url: 'http://oa-statics.caihonggou.com/data/ppts/5a28ed32786f0/index.html',
        },
      ],
    };
  },

  computed: {
    // 当前路由地址
    currenRoutetPath() {
      return this.$route.path;
    },
  },

  methods: {
    pptPreview(url) {
      location.href = url;
    },

    pptPopup() {
      this.active = true;
    },
  },
};
</script>

<style lang="less">

.border-style() {
  content: " ";
  position: absolute;
  color: @border-color;
}

.border-column() {
  .border-style();
  height: 1px;
  left: 0;
  right: 0;
  transform: scaleY(0.5);
}

.border-row() {
  .border-style();
  width: 1px;
  top: 0;
  bottom: 0;
  transform: scaleX(0.5);
}

.course-detail {
  position: relative;
  overflow: hidden;

  &__header {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    padding-bottom: 10px;
    background-color: @bg-color;
  }

  &__body {
    padding-top: 151px;
  }

  &__meta {
    padding: 10px;

    b {
      font-size: 15px;
      color: @text-color-default;
    }

    &__small {
      margin-top: 8px;
      color: @text-color-secondary;
      font-size: 13px;
    }
  }

  &__action {
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: #fff;

    &:before {
      .border-column();
      top: 0;
      border-top: 1px solid @border-color;
      transform-origin: 0 0;
    }

    &:after {
      .border-row();
      left: 0;
      border-left: 1px solid @border-color;
      transform-origin: 0 0;
    }

    & > a {
      flex: 1;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;

      &:before {
        .border-row();
        right: 0;
        border-right: 1px solid @border-color;
        transform-origin: 100% 0;
      }

      &:after {
        .border-column();
        bottom: 0;
        border-bottom: 1px solid @border-color;
        transform-origin: 0 100%;
      }

      & > i {
        color:@primary-color;
        font-size: 38px;
        margin-right: 10px;
      }
    }
  }

  &__comment {
    position: relative;
    padding: 25px 10px 20px 10px;
    background-color: #fff;
    margin-bottom: 10px;

    &:before {
      .border-column();
      top: 0;
      border-top: 1px solid @border-color;
      transform-origin: 0 0;
    }

    &:after {
      .border-column();
      bottom: 0;
      border-bottom: 1px solid @border-color;
      transform-origin: 0 100%;
    }

    &__wrap {
      position: relative;
      border: 1px dashed @text-color-subsidiary;
      border-radius: 5px;
      padding: 12px 15px;

      & > h5 {
        position: absolute;
        left: 50%;
        top: -10px;
        height: 20px;
        width:80px;
        margin-left: -40px;
        background-color: #fff;
        color: @text-color-subsidiary;
        text-align: center;
        line-height: 1;
        font-size: 15px;
        font-weight: normal;
      }

      & > p {
        text-indent:1em;
        font-size: 15px;
      }
    }

    &__lefticon , &__righticon {
      color: @text-color-subsidiary;
      font-size: 12px;
      position: absolute;
    }

    &__lefticon {
      left: 5px;
      top: 4px;
    }

    &__righticon {
      right: 5px;
      bottom: 4px;
    }
  }

  &__section {
    padding: 20px 10px;
    background-color: #fff
  }
}
</style>
