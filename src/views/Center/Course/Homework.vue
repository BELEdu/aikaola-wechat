<template>
  <div class="homework">

    <ul class="homework__wrap clearfix">
      <!-- 图片列表 -->
      <li v-for="(img,index) in list" :key="index">
        <div class="homework__item" @click="openImg(index,img.url)">
          <!-- 图片 -->
          <img v-img-src="img.url || img.preview">
          <!-- 提示信息遮罩层 -->
          <div class="homework__item__mask" v-if="!img.url">
            {{img.text}}
          </div>
        </div>
      </li>

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
      class="homework__preview"
      :list="previewData"
      :options="options"
      ref="previewer"
      @on-close="onClose"
      @getCurrentIndex="getCurrentIndex"
    >
      <div
        slot="button-before"
        class="homework__preview__action"
      >
        <svg><use xlink:href="#trash" /></svg>
      </div>
    </Previewer>

  </div>
</template>

<script>

import { mapState } from 'vuex';
import { XButton, Previewer } from 'vux';

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
  },

  data() {
    return {
      lastUrl: '/', // 上一个路由地址

      list: [], // 图片列表

      tips: false, // 图片格式是否正确小贴士

      loading: false, // 提交按钮loading

      options: {},
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

    previewData() {
      return this.submitData.map(img => ({
        src: img.url,
      }));
    },

    ss() {
      return this.$refs.previewer;
    },
  },

  methods: {
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

    // 移除文件
    removeImg(id) {
      const index = this.list
        .findIndex(({ myid }) => (myid === id));
      // 延时三秒
      setTimeout(() => {
        this.list.splice(index, 1);
      }, 3000);
    },

    // 图片预览
    openImg(index, url) {
      if (url) {
        store.commit('updateMask', true);
        this.$refs.previewer.show(index);
      }
    },

    // 图片预览组件关闭时触发
    onClose() {
      store.commit('updateMask', false);
    },

    // 获取上次上传的作业信息
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
          this.$vux.toast.text('上传成功');
          this.$router.replace(this.lastUrl);
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

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line
      vm.lastUrl = from.path;
    });
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
    }

    & svg {
      position: absolute;
      top: 50%;
      left:50%;
      margin-top: -30%;
      margin-left: -30%;
      width: 60%;
      height: 60%;
      fill: @upload-border;
    }

    & label {
      position: absolute;
      width: calc(~"100% - 2px");
      height: calc(~"100% - 2px");
      border:1px dashed @upload-border;
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

    &__action {
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
