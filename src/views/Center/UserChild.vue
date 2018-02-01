<template>
  <div
    v-if="data"
    v-acme
    class="user-child"
  >
    <ThePanel
      v-slide:left="() => slideCourse(1)"
      v-slide:right="() => slideCourse(-1)"
      :avatar="childAvatar"
      :name="data.display_name"
    >
      <span class="ellipsis" slot="content">
        课程名称：{{classInfo.product_name}}
      </span>
      <span slot="content">
        剩余课时：{{classInfo.remain_total}}课时
      </span>

      <SwiperIndicator
        :value="indicatorIndex"
        :length="data.classes.length"
      />
    </ThePanel>

    <div
      v-if="classInfo.comment.length"
      class="user-child__evaluations"
    >
      <UserChildEvaluation
        v-for="comment in classInfo.comment"
        :key="comment.date"
        :data="comment"
      />
    </div>

    <DefaultContent v-else text="暂无评价"/>
  </div>
</template>

<script>
/**
 * @desc 个人中心 - 孩子信息
 */
import { slide } from '@/directives';
import defaultAvatar from '@/assets/avatar-default.svg';
import { loadingTool } from '@/mixins';
import {
  DefaultContent,
  SwiperIndicator,
  ThePanel,
} from '@/components';
import { UserChildEvaluation } from './components';

export default {
  name: 'UserChild',

  components: {
    DefaultContent,
    SwiperIndicator,
    ThePanel,
    UserChildEvaluation,
  },

  mixins: [loadingTool],

  directives: {
    slide,
  },

  data: () => ({
    data: null,

    classIndex: 0,
  }),

  computed: {
    classInfo() {
      return this.data.classes[this.indicatorIndex];
    },

    childAvatar() {
      return (this.data && this.data.head_url) || defaultAvatar;
    },

    indicatorIndex() {
      const id = Number(this.$route.params.classId);

      return this.data.classes
        .findIndex(item => item.id === id);
    },
  },

  created() {
    this.fetchChild();
  },

  methods: {
    fetchChild(
      studentId = this.$route.params.studentId,
    ) {
      const url = `/center/comment_all/${studentId}`;

      this.$http.get(url)
        .then((res) => { this.data = res; })
        .then(this.hideLoading);
    },

    slideCourse(step) {
      const len = this.data.classes.length;

      const index = this.indicatorIndex + step;

      const valid = index >= 0 && index < len;

      if (valid) {
        const classId = this.data.classes[index].id;

        this.$router.replace({
          params: { classId },
        });
      }
    },
  },
};
</script>

<style lang="less">
@gutter: 15px;

.user-child {
  display: flex;
  flex-direction: column;

  .default-content {
    flex-grow: 1;
  }

  .the-panel__description {
    min-width: 0;
  }
}

.user-child-evaluation:not(:last-child) {
  border-bottom: 1px solid @bd-color-base;
}

.user-child__evaluations {
  background-color: #fff;
  margin-bottom: @gutter;
}
</style>
