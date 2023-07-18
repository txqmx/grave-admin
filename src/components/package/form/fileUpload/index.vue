<template>
  <div class="mc-input_container">
    <el-upload
      v-model:file-list="fileList"
      :class="{ disabled: uploadDisabled }"
      v-bind="$attrs"
      ref="fileUpload"
      :list-type="listType"
      :on-success="uploadSuccess"
      :on-remove="remove"
      :before-upload="beforeUpload"
    >
      <el-icon v-if="type === 'img'"><Plus /></el-icon>

      <el-button v-else :disabled="uploadDisabled" type="primary"
        >upload</el-button
      >
    </el-upload>
    <Cropper ref="cropperImg" @colse-dialog="closeDialog" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import Cropper from './cropper.vue';
import api from '@/api';
import { imgUrlParser } from '@/utils/Parser'
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'FileUploadEditor',
  inject: ['inputWidth'],
  components: { Plus, Cropper },
  data() {
    return {
      fileList: [],
      listType: 'text',
      accept: null
    };
  },
  props: {
    type: {
      default: '',
    },
    multiple: {
      default: false,
    },
    modelValue: {
      default: '',
    },
    corpper: {
      default: true,
    },
    folder: {
      default: '',
    },
    corpperScale: {
      default: () => [100, 100],
    },
  },
  watch: {
    modelValue() {
      this.init();
    },
  },
  computed: {
    uploadDisabled() {
      return !this.multiple && this.fileList.length > 0;
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      if (this.type === 'img') {
        this.listType = 'picture-card';
        this.accept = 'image/*';
      }
      this.fileList = this.valueToList();
    },
    valueToList() {
      if (!this.modelValue) return [];
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.map((item) => {
          return {
            name: this.getFileName(item),
            url: imgUrlParser(item),
            path: item,
          };
        });
      } else {
        return [
          {
            name: this.getFileName(this.modelValue),
            url: imgUrlParser(this.modelValue),
            path: this.modelValue,
          },
        ];
      }
    },
    listToValue(fileList) {
      if (!fileList.length) return '';
      if (this.multiple) {
        return fileList.map((item) => {
          return item.path;
        });
      } else {
        return fileList[0].path;
      }
    },
    getFileName(path) {
      let i = path.lastIndexOf('/');
      return path.substr(i + 1);
    },
    // 上传方法
    httpRequest(file) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('type', this.folder);
      api
        .upload(formData, {
          headers: {
            contentType: 'multipart/form-data', // 需要指定上传的方式
          },
        })
        .then((res) => {
          this.uploadSuccess(res);
        });
    },
    uploadSuccess(res, file, files) {
      if (this.multiple) {
        this.fileList.push({
          name: res.name,
          url: res.fileUrl,
          path: res.path,
        });
      } else {
        this.fileList = [
          {
            name: res.name,
            url: res.fileUrl,
            path: res.path,
          },
        ];
      }
      this.$emit('update:modelValue', this.listToValue(this.fileList));

      ElMessage.success('上传成功');
    },
    remove() {
      this.$emit('update:modelValue', this.listToValue(this.fileList));
    },
    beforeUpload(rawFile) {
      return new Promise((resolve, reject) => {
        if (this.type === 'img' && this.corpper) {
          console.log(this.corpperScale);
          this.$refs.cropperImg.initCropper(rawFile, {
            fixedNumber: this.corpperScale,
            autoCropWidth: this.corpperScale[0],
            autoCropHeight: this.corpperScale[1],
            success: this.httpRequest,
          });
        } else {
          this.httpRequest(rawFile);
        }

        reject();
      });
    },
    closeDialog() {
      this.fileList.pop();
    },
  },
});
</script>

<style lang="scss" scoped>
.disabled {
  :deep .el-upload--picture-card {
    display: none;
  }
}
</style>
