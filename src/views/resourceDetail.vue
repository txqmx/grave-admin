<template>
  <div>
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
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api';
export default defineComponent({
  data() {
    return {
      pageId: this.$route.query.id,
      dataType: this.$route.query.dataType,
      code: this.$route.query.code,
      defaultData: {},
      formDesc: [
        {
          type: 'InputEditor',
          label: '标题',
          field: 'name',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '副标题',
          field: 'subName',
        },
        {
          type: 'FileUploadEditor',
          label: '封面',
          field: 'cover',
          attrs: {
            type: 'img',
            corpper: true,
            corpperScale: [180, 120],
          },
        },
        {
          type: 'FileUploadEditor',
          label: '文件',
          field: 'enclosure',
        },
        {
          type: 'TextEditor',
          label: '简介',
          field: 'info',
        },
        {
          type: 'RichEditor',
          label: '内容',
          field: 'content',
        },
      ],
    };
  },
  mounted() {
    this.$store.commit('setBackRoute', {
      name: 'ResourceTypeDetail',
      query: {
        dataType: this.dataType,
        code: this.code,
      },
    });
    if (this.pageId) {
      this.getDetail();
    }
  },
  methods: {
    async getDetail() {
      let defaultData = await api.getResourceDetail({ id: this.pageId });
      this.defaultData = defaultData;
    },
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        if (res.id) {
          await api.updateResource(res);
        } else {
          await api.addResource({
            ...res,
            type: this.code,
            dataType: this.dataType,
          });
        }

        ElMessage({
          message: this.pageId ? '修改成功' : '新增成功',
          type: 'success',
        });
        this.$router.push({
          name: 'ResourceTypeDetail',
          query: {
            dataType: this.dataType,
            code: this.code,
          },
        });
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
