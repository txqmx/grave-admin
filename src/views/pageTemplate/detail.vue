<template>
  <div class="family-container">
    <form-container ref="formContainer" :formDesc="formDesc" :defaultData="defaultData" label-width="60px"
      input-width="200px">
    </form-container>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import api from '@/api';
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { getUrlParam } from '@/utils/Url'

export default defineComponent({
  data() {
    return {
      detailId: this.$route.query.id,
      defaultData: {},
      formDesc: [
        {
          type: 'InputEditor',
          label: '名字',
          field: 'name',
          rules: { required: true },
        },
        {
          type: 'JsonEditor',
          label: '配置',
          field: 'config',
          rules: { required: true },
        }
      ],
    };
  },
  created() {
    if(this.detailId){
      this.getDetailInfo()
    }
  },
  methods: {
    // 获取详情
    async getDetailInfo() {
      let dataSource = {
        method: 'get',
        url: '/api/admin/pageTemplate/detail',
      }
      let params = {
        id: this.detailId
      }
      let res = await api.axios(dataSource, params)
      this.defaultData = res
    },
    // 保存
    async submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let dataSource = {
          method: 'post',
          url: '/api/admin/pageTemplate/create',
        }
        let params = {...res}
        if(this.defaultData.id){
          dataSource.url = '/api/admin/pageTemplate/update'
          params.id = this.defaultData.id
        }
        let item = await api.axios(dataSource,params);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.$router.replace(this.$route.meta.backRoute)
      });
    },
  },
});
</script>

<style lang="scss">
.family-container {
  padding: 20px;
  background: #ffffff;
}
</style>
