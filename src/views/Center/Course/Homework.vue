<template>
  <div class="homework">

    <ul class="homework__wrap clearfix">

      <!-- 拖拽上传插件 -->
      <Draggable v-model="list">
        <transition-group>
          <!-- 图片列表 -->
          <li v-for="(img,index) in list" :key="index">
            <div class="homework__item" @click="openPreviewImg(index,img.url)">
              <!-- 图片 -->
              <img
                v-img-src="formatImg(img.url,img.preview)"
                class="my-previewer-img"
              >
              <!-- 提示信息遮罩层 -->
              <div class="homework__item__mask" v-if="!img.url">
                {{img.text}}
              </div>
            </div>
          </li>
        </transition-group>
      </Draggable>

      <!-- 上传按钮 -->
      <li>
        <div class="homework__item">
          <svg><use xlink:href="#plus" /></svg>
          <Upload
            @update-tips="updateTips"
            @add-img="addImg"
            @update-img="updateImg"
            @remove-img="removeImg"
          ></Upload>
        </div>
      </li>
    </ul>

    <!-- 提交按钮 -->
    <div class="homework__submit">
      <XButton
        :disabled="submitData.length === 0"
        :show-loading="loading"
        type="primary"
        @click.native="submit"
      >确认上传</XButton>

      <p
        v-if="tips"
        class="homework__submit__tips"
      >
        <b>提示：</b>不符合格式标准的文件已被过滤
      </p>
    </div>

    <!-- 图片预览组件 -->
    <Previewer
      v-if="previewData.length>0"
      class="homework__preview"
      :list="previewData"
      :options="previewOptions"
      ref="previewer"
      @on-close="onPreviewClose"
    >
      <div
        slot="button-before"
        class="homework__preview__delete"
        @click="deletePreviewImg"
      >
        <svg><use xlink:href="#trash" /></svg>
      </div>
    </Previewer>

  </div>
</template>

<script>

import { mapState } from 'vuex';
import { XButton, Previewer } from 'vux';
import Draggable from 'vuedraggable';

import { formUtils, loadingTool } from '@/mixins';
import store from '@/store';

import { Upload } from './components';

export default {
  name: 'CourseHomework',

  mixins: [formUtils, loadingTool],

  components: {
    XButton,
    Upload,
    Previewer,
    Draggable,
  },

  data() {
    return {
      list: [], // 图片列表

      tips: false, // 图片格式是否正确小贴士

      loading: false, // 提交按钮loading

      // 图片预览插件的配置
      previewOptions: {
        // 处理图片弹出效果的方法
        getThumbBoundsFn(index) {
          // 找到缩略图的元素
          const thumbnail = document.querySelectorAll('.my-previewer-img')[index];
          // 获取 window scroll Y
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          // 可选得到水平滚动
          // 获取元素在视图中相对于相对定位的绝对定位
          const rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
      },
    };
  },

  computed: {
    ...mapState({
      mask: state => state.mask,
    }),

    // 试卷id
    paperId() {
      return +this.$route.params.paperId;
    },

    // 最终可供提交的图片列表
    submitData() {
      return this.list
        .filter(img => !!img.url)
        .map((val, key) => ({
          ...val,
          sort: key + 1,
        }));
    },

    // 转换为preview组件需要的格式
    previewData() {
      return this.submitData.map(img => ({
        src: `${img.url}?imageMogr2/auto-orient`,
      }));
    },

    // 返回的地址
    backUrl() {
      return `/center/course/${this.$route.params.studentId}/${this.$route.params.courseId}`;
    },
  },

  methods: {
    /**
     * @description 图片格式化
     * 先判断是否是来源于七牛的图片地址
     * 根据原图EXIF信息自动旋正
     * 裁剪正中部分，等比缩小生成100x100缩略图：
     */
    formatImg(url, preview) {
      if (url) {
        const isQiniuSrc = url.includes('https://oa-statics.caihonggou.com/');
        if (isQiniuSrc) return `${url}?imageMogr2/auto-orient&imageView2/1/w/100/h/100`;
        return url;
      }
      return preview;
    },

    // 图片预览
    openPreviewImg(index, url) {
      if (url) {
        store.commit('updateMask', true);
        this.$refs.previewer.show(index);
      }
    },

    // 删除预览的图片
    deletePreviewImg() {
      const previewIndex = this.$refs.previewer.getCurrentIndex();
      // eslint-disable-next-line
      const _this = this;
      this.$vux.confirm.show({
        title: '提示',
        content: '是否删除该图片？',
        onConfirm() {
          _this.list.splice(previewIndex, 1);
          if (_this.list.length === 0) {
            store.commit('updateMask', false);
          }
          _this.$vux.toast.text('删除成功');
        },
      });
    },

    // 图片预览组件关闭时触发
    onPreviewClose() {
      store.commit('updateMask', false);
    },

    // 更新小贴士信息
    updateTips(val) {
      this.tips = val;
    },

    // 添加图片
    addImg(img) {
      this.list.push(img);
    },

    // 更新图片信息
    updateImg(id, data) {
      // 找到我上传时提交的随机数对应的数组的index
      const index = this.list
        .findIndex(({ myid }) => (myid === id));
      // 更新数据
      this.$set(this.list, index, {
        ...this.list[index],
        ...data,
      });
    },

    // 移除图片
    removeImg(id) {
      const index = this.list
        .findIndex(({ myid }) => (myid === id));
      // 延时三秒
      setTimeout(() => {
        this.list.splice(index, 1);
      }, 3000);
    },

    // 获取已上传的作业信息
    getImgData() {
      this.$http.get(`/course/image/${this.paperId}`)
        .then((res) => {
          this.list = [...this.list, ...res];
        })
        .catch(this.alertError)
        .then(() => {
          this.hideLoading();
        });
    },

    // 保存图片
    submit() {
      this.loading = true;
      this.$http.post(`/course/image_save/${this.paperId}`, {
        data: this.submitData,
      })
        .then(() => {
          this.$vux.toast.text('课后作业保存成功');
          this.$router.replace(this.backUrl);
        })
        .catch(this.alertError)
        .then(() => {
          this.loading = false;
        });
    },
  },

  created() {
    this.getImgData();
  },
};
</script>

<style lang="less">
@upload-border:#D9D9D9;

.homework {
  &__wrap {
    margin-top: 10px;
    background-color: #ffffff;
    padding: 5px;
    list-style: none;

    & li {
      float: left;
      padding: 5px;
      width: calc(~"25% - 10px");
    }
  }

  &__item {
    cursor: pointer;
    position: relative;
    width: 100%;
    padding-bottom: 100%;

    &__mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 14px;
    }

    & img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: @background-color;
      transition: all 0.2s;
    }

    & svg {
      position: absolute;
      top: 50%;
      left:50%;
      margin-top: -30%;
      margin-left: -30%;
      width: 60%;
      height: 60%;
      fill: @text-color-subsidiary;
      transition: all 0.2s;
    }

    & label {
      position: absolute;
      width: calc(~"100% - 2px");
      height: calc(~"100% - 2px");
      border:1px dashed @text-color-subsidiary;
      transition: all 0.2s;
    }

    &:active {
      & svg {
        fill: @text-color-secondary;
      }
      & label {
        border:1px dashed @text-color-secondary;
      }
    }
  }

  &__submit {
    padding: 10px;

    &__tips {
      text-align: center;
      font-size: 14px;
      margin-top: 10px;
      line-height: 1;
      color: @error-color;
    }
  }

  &__preview {
    z-index: 999;

    &__delete {
      margin-right: 10px;
      width: 44px;
      height: 44px;
      position: relative;
      cursor: pointer;
      display: flex;
      float: right;
      justify-content: center;
      align-items: center;

      & svg {
        fill:#fff;
        height: 18px;
        width: 18px;
      }
    }
  }
}
</style>
