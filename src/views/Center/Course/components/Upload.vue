<template>
  <label>
    <input
      type="file"
      hidden
      multiple
      accept='image/jpg,image/jpeg'
      @change="onChange"
    >
  </label>
</template>

<script>

// eslint-disable-next-line
const defaultImg = {
  myid: null, // 随机数id，作为标记
  preview: null, // 本地预览图
  url: null, // 七牛url地址
  name: '',
  text: '',
};

export default {
  name: 'upload',

  methods: {
    onChange(event) {
      this.$emit('update-tips', false);

      const files = [...event.target.files];
      files.forEach((file) => {
        // 校验图片格式
        const isMatch = /image\/(jpg|jpeg)/.test(file.type);
        // 校验图片大小
        const isLimited = file.size < 50 * 1024 * 1024;

        if (!isMatch || !isLimited) {
          this.$emit('update-tips', true);
        } else {
          this.imgPreview(file);
        }
      });
    },

    imgPreview(file) {
      // eslint-disable-next-line
      const myid = parseInt(100000 * Math.random())

      // 文件名过滤后缀
      const formatName = file.name.replace(/\.[^.]+$/, '');

      // 文件预览名和 myid
      this.$emit('add-img', {
        ...defaultImg,
        myid,
        name: formatName,
      });

      // 读取图片文件
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        // 本地预览图片（base64）
        this.$emit('update-img', myid, {
          preview: reader.result,
          text: '上传中...',
        });
        // 上传图片
        this.imgUpload(myid, file);
      });
      reader.readAsDataURL(file);
    },

    imgUpload(myid, file) {
    // formData格式
      const formData = new FormData();
      formData.append('paper', file);

    // 定义一个XMLHttpRequest对象
      const xhr = new XMLHttpRequest();
     // 定义接口地址和提交形式
      xhr.open('POST', '/v1/course/upload', true);
      // 设置请求头参数
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // 设置提交数据
      xhr.send(formData);

      xhr.addEventListener('load', (data) => {
        const resJson = JSON.parse(data.target.response);
        const status = data.target.status;

        // 上传成功更新图片
        if (status === 200) {
          this.$emit('update-img', myid, {
            ...resJson,
            preview: null,
            text: '上传成功',
          });
        } else {
          // 上传错误的话移除该图片
          this.$emit('update-img', myid, {
            text: '上传失败',
          });
          this.$emit('remove-img', myid);
        }
      });
    },

  },

};
</script>

<style lang="less">

</style>
