<template>
  <div
    class="course-detail"
    v-if="course"
    v-acme
  >
    <!-- 课程和教师信息 -->
    <div class="course-detail__meta">
      <Divider>
        <h3>第 {{course.sort_value}} 节课</h3>
        <h5 a>教师：{{course.teacher_name}}</h5>
      </Divider>
    </div>

    <div class="course-detail__action">
      <!-- 上传作业 -->
      <a
        :class="{'course-detail__action__disabled':!paperActive}"
        @click="paperPopup"
      >
        <div class="course-detail__action__svg">
          <badge v-if="pptActive"></badge>
          <svg><use :xlink:href="uploadSvgId" /></svg>
        </div>
        <span>上传作业</span>
      </a>

      <!-- ppt课件预览 -->
      <a
        :class="{'course-detail__action__disabled':!pptActive}"
        @click="pptPopup"
      >
        <div class="course-detail__action__svg">
          <badge v-if="pptActive"></badge>
          <svg><use :xlink:href="pptSvgId" /></svg>
        </div>
        <span>课件预览</span>
      </a>
    </div>

    <!-- 教学评价 -->
    <div
      class="course-detail__comment"
      v-if="course.comment !== ''"
    >
      <div class="course-detail__comment__wrap">
        <h5>评价内容</h5>
        <svg class="course-detail__comment__svg-left">
          <use xlink:href="#quotation-mark-left" />
        </svg>
        <svg class="course-detail__comment__svg-right">
          <use xlink:href="#quotation-mark-right" />>
        </svg>
        <p>{{course.comment}}</p>
      </div>
    </div>

    <!-- 课程内容区域 -->
    <div class="course-detail__content">
      <h3>授课内容：</h3>
      <section v-html="course.chapter_name"></section>
    </div>

    <!-- 教案区域 -->
    <section
      v-if="course.scheme_content !== ''"
      class="course-detail__section"
      v-html="course.scheme_content"
    ></section>

    <!-- 课件预览弹出菜单 -->
    <Popup
      v-model="ppt.active"
      class="course-detail__popup"
    >
      <PopupHeader
        :show-bottom-border="false"
        title="请选择课件"
      />
      <Group gutter="0">
        <cell
          v-for="( ppt,index ) in ppt.data"
          :key="index"
          :title="ppt.display_name"
          is-link
          @click.native="pptPreview(ppt.url)"
        ></cell>
      </Group>
    </Popup>

    <!-- 上传作业弹出菜单 -->
    <Popup
      v-model="paper.active"
      class="course-detail__popup"
    >
      <PopupHeader
        :show-bottom-border="false"
        title="请选择课后作业"
      />
      <Group gutter="0">
        <cell
          v-for="( paper,index ) in paper.data"
          :key="index"
          :title="paper.test_paper_name"
          is-link
          @click.native="paperUpload(paper.id)"
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
  Badge,
} from 'vux';

import { formUtils, loadingTool } from '@/mixins';

export default {
  name: 'CourseDetail',

  mixins: [formUtils, loadingTool],

  components: {
    Divider,
    Popup,
    PopupHeader,
    Group,
    Cell,
    Badge,
  },

  data() {
    return {
      course: null, // 课程数据

      // 课件参数
      ppt: {
        data: [],
        active: false,
      },

      // 试卷参数
      paper: {
        data: [],
        active: false,
      },
    };
  },

  computed: {
    // 学生id
    studentId() {
      return +this.$route.params.studentId;
    },

    // 课程id
    courseId() {
      return +this.$route.params.courseId;
    },

    // 当前路由地址
    currenRoutetPath() {
      return this.$route.path;
    },

    // 是否可以上传作业
    paperActive() {
      return this.paper.data.length > 0;
    },

    // 是否有ppt可以预览
    pptActive() {
      return this.ppt.data.length > 0;
    },

    // 上传作业的SVG图标id
    uploadSvgId() {
      return `#${this.paperActive ? 'upload-homework-active' : 'upload-homework-disabled'}`;
    },

    // 上传作业的SVG图标id
    pptSvgId() {
      return `#${this.pptActive ? 'ppt-active' : 'ppt-disabled'}`;
    },
  },

  methods: {
    // 跳转ppt链接
    pptPreview(url) {
      location.href = url;
    },

    // 前往上传作业
    paperUpload(paperId) {
      this.$router.push(`${this.currenRoutetPath}/${paperId}`);
    },

    // 预览ppt选择菜单
    pptPopup() {
      if (this.pptActive) {
        this.ppt.active = true;
      } else {
        this.$vux.toast.text('该课程暂无PPT课件');
      }
    },

    // 上传课件选择菜单
    paperPopup() {
      if (this.paperActive) {
        this.paper.active = true;
      } else {
        this.$vux.toast.text('该课程暂无课后作业');
      }
    },

    // 获取课程数据
    getCourselData() {
      this.$http.get(`/course/detail/${this.studentId}/${this.courseId}`)
        .then((res) => {
          this.course = res;
        })
        .catch(this.alertError)
        .then(() => {
          this.hideLoading();
        });
    },

    // 获取课件数据
    getpptData() {
      this.$http.get(`/course/attachment/${this.courseId}`)
        .then((res) => {
          this.ppt.data = res;
        })
        .catch(this.alertError);
    },

    // 获取测试数据
    getPaperData() {
      this.$http.get(`/course/paper/${this.studentId}/${this.courseId}`)
        .then((res) => {
          this.paper.data = res;
        })
        .catch(this.alertError);
    },
  },

  created() {
    this.getCourselData();
    this.getpptData();
    this.getPaperData();
  },
};
</script>

<style lang="less">

@svg-size:40px;

.content-margin(){
  margin-top:10px;
}

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

  &__meta {
    padding: 6px 10px;
    line-height: 1;

    h3 {
      font-size: 15px;
      color: @text-color-default;
    }

    h5 {
      margin-top: 8px;
      color: @text-color-secondary;
      font-size: 13px;
      font-weight: normal;
    }
  }

  &__action {
    display: flex;
    position: relative;
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

    &__svg {
      position: relative;
      margin-right: 12px;
      height: @svg-size;
      width: @svg-size;

      svg {
        width: 100%;
        height: 100%;
      }

      .vux-badge {
        position: absolute;
        right: -5px;
        top: 0;
      }
    }

    & > a {
      flex: 1;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      color: @text-color-default;

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
    }

    &__disabled {
      color: @text-color-subsidiary !important;
    }
  }

  &__comment {
    .content-margin();
    position: relative;
    padding: 25px 10px 20px 10px;
    background-color: #fff;

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

      & > svg {
        position: absolute;
        width:12px;
        height: 12px;
        fill: @text-color-subsidiary;
      }
    }

    &__svg-left {
      left: 8px;
      top: 5px;
    }

    &__svg-right {
      right: 8px;
      bottom: 5px;
    }
  }

  &__content {
    .content-margin();
    padding: 10px;
    font-size: 14px;
    background-color: #fff;

    h3 {
      font-size: 15px;
      color: @text-color-default;
    }
  }

  &__section {
    .content-margin();
    padding: 20px 10px;
    background-color: #fff;
    font-size: 14px;
    overflow-x: scroll;
  }

  &__popup {
    .vux-cell-bd  {
      font-size: 15px;
    }
  }
}
</style>
