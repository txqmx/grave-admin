<template>
  <div class="family-container">
    <form-container
      ref="formContainer"
      :formDesc="formDesc"
      :defaultData="defaultData"
      label-width="80px"
      input-width="200px"
    >
    </form-container>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
import api from '../api';
import { defineComponent, ref, computed } from 'vue';
import UploadImg from '../components/Cropper/uploadImg.vue';
import { ElMessage } from 'element-plus';
import { getUrlParam } from '@/utils/Url'

export default defineComponent({
  name: 'FamilyDetail',
  components: { UploadImg },
  data() {
    return {
      defaultData: {},
      formDesc: [
        {
          type: 'InputEditor',
          label: 'id',
          field: 'id',
          rules: { required: true },
          attrs: { disabled: true },
        },
        {
          type: 'InputEditor',
          label: '名字',
          field: 'name',
        },
        {
          type: 'FileUploadEditor',
          label: '封面',
          field: 'cover',
          attrs: {
            type: 'img',
            corpper: true,
            folder: 'home',
            corpperScale: [224, 288],
          },
        },
        {
          type: 'TextEditor',
          label: '简介',
          field: 'info',
        },
        {
          type: 'RichEditor',
          label: '内容',
          field: 'detail',
        },
      ],
    };
  },
  mounted() {
    const familyCode = getUrlParam('family')
    window.localStorage.setItem('family', familyCode)
    this.getGenealogy();
  },
  methods: {
    async getGenealogy() {
      this.defaultData = await api.getGenealogy({ code: getUrlParam('family') });
    },
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        await api.updateGenealogy(res);
        this.getGenealogy();
        ElMessage({
          message: '修改成功',
          type: 'success',
        });
      });
    },
  },
});
</script>

<style lang="scss">
.family-container {
  padding: 10px;
  background: #ffffff;
}
</style>
