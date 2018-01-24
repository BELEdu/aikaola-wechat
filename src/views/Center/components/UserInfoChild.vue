<template>
  <div class="user-info__child">
    <div class="user-info__child__title">
      <span><img v-imgSrc="data.head_url"></span>
      <span>{{data.display_name}}</span>
    </div>
    <UserInfoChildCourse
      v-for="course in data.classes"
      :key="course.product_id"
      :data="course"
      @click.native="toCourseInfo(data.id, course.product_id)"
    />
  </div>
</template>

<script>
/**
 * @desc    个人中心 - 用户信息 - 孩子卡片
 * @author  hjz
 */

import UserInfoChildCourse from './UserInfoChildCourse';

export default {
  name: 'UserInfoChild',

  components: {
    UserInfoChildCourse,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    toCourseInfo(studentId, classId) {
      const path = `/center/user-child/${studentId}/${classId}`;
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less">
@gutter: 15px;

.user-info__child {
  margin: @gutter 0;
  padding-left: @gutter;
  background-color: #fff;
}

.user-info__child__title {
  display: flex;
  align-items: center;
  padding: 10px 0;

  span:first-of-type {
    margin-right: 10px;
    height: 36px;
    width: 36px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  span:last-of-type {
    font-size: @text-size-title;
  }
}
</style>
