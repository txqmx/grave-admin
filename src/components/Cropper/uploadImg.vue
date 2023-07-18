<template>
  <div>
    <el-upload
      v-show="!resultImg"
      class="avatar-uploader"
      accept="image/*"
      ref="fileUpload"
      :action="action"
      :on-change="selectChange"
      :show-file-list="false"
      :auto-upload="false"
      :http-request="httpRequest"
    >
      <img v-if="imageUrl" :src="rootPath + imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <Cropper
      v-if="showCropper"
      :dialog-visible="showCropper"
      :cropper-img="cropperImg"
      @update-cropper="updateCropper"
      @colse-dialog="closeDialog"
      @upload-img="uploadImg"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Cropper from './cropper.vue';
import { Plus } from '@element-plus/icons-vue';
import api from '../../api';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'UploadImg',
  components: {
    Plus,
    Cropper,
  },
  props: ['modelValue', 'rootPath'],
  computed: {
    imageUrl: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  data() {
    return {
      uploadData: {
        // 上传需要的额外参数
        siteId: 1,
        source: 1,
      },
      action: '/api/file/uploadAvatar', // 上传地址，必填
      cropperImg: '', // 需要裁剪的图片
      showCropper: false, // 是否显示裁剪框
      uploadFile: '', // 裁剪后的文件
      resultImg: '', // 上传成功，后台返回的路径
    };
  },
  methods: {
    // submit 之后会触发此方法
    httpRequest(request) {
      const { action, data, filename } = request;
      // 新建formDate对象
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      // 文件单独push,第三个参数指定上传的文件名
      formData.append(filename, this.uploadFile);
      formData.append('type', 'avatar');
      api
        .upload(formData, {
          headers: {
            contentType: 'multipart/form-data', // 需要指定上传的方式
          },
        })
        .then((res) => {
          this.imageUrl = res.path;
          this.closeDialog();
          this.$refs.fileUpload.clearFiles();
          ElMessage.success('上传成功');
        });
    },
    // 选择文件
    selectChange(file) {
      const { raw } = file;
      this.openCropper(raw);
    },
    /**
     * @param {file} 上传的文件
     */
    openCropper(file) {
      console.log(file);
      var files = file;
      //   let isLt5M = files.size > 5 << 20;
      //   if (isLt5M) {
      //     this.$message.error("请上传5M内的图片");
      //     return false;
      //   }
      var reader = new FileReader();

      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.cropperImg = data;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(files);
      this.showCropper = true;
    },
    // 上传图片
    uploadImg(file) {
      this.uploadFile = new File([file], 'img.png', { type: 'image/png' });
      this.$refs.fileUpload.submit();
    },
    // 更新图片
    updateCropper() {
      this.$refs.fileUpload.$children[0].$el.click();
    },
    // 关闭窗口
    closeDialog() {
      this.showCropper = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 112px;
  height: 144px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
