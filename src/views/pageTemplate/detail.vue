<template>
  <div class="family-container">
    <form-container ref="formContainer" :formDesc="formDesc" :defaultData="defaultData" label-width="60px"
      input-width="200px">
    </form-container>
    <el-button @click="submit">提交</el-button>
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
        }
      ],
    };
  },
  created() {
    // 设置返回路由
    this.$store.commit('setBackRoute', this.$route.meta.backRoute);
    
    if(this.detailId){
      this.getDetailInfo()
    }
  },
  methods: {
    // 获取详情
    async getDetailInfo() {
      let dataSource = {
        method: 'get',
        url: '/api/pageTemplate/detail',
      }
      let params = {
        id: this.detailId
      }
      let res = await api.axios(dataSource, params);
      this.defaultData = res
    },
    // 保存
    async submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let dataSource = {
          method: 'post',
          url: '/api/pageTemplate/create',
        }
        let params = {...res}
        if(this.defaultData.id){
          dataSource.url = '/api/pageTemplate/update'
          params.id = this.defaultData.id
        }
        let item = await api.axios(dataSource,params);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.$store.commit('setBackRoute', '');
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
