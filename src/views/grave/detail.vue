<template>
  <div class="family-container">
    <form-container
      ref="formContainer"
      :formDesc="formDesc"
      :defaultData="defaultData"
      label-width="60px"
      input-width="200px"
    >
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
        },
        {
          type: 'InputEditor',
          label: '编码',
          field: 'code',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '密码',
          field: 'password',
        },
        {
          type: 'InputEditor',
          label: '封面',
          field: 'cover',
        },
        {
          type: 'InputEditor',
          label: '地址',
          field: 'address',
        },
        {
          type: 'InputEditor',
          label: '简介',
          field: 'desc',
        },
      ],
    };
  },

  created(){
    if(this.detailId){
      this.getDetailInfo()
    }
  },
  methods: {
    async getDetailInfo(){
      let res = await api.getGraveInfo({
        id: this.detailId
      });
      this.defaultData = res
    },
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let apiUrl = 'createGrave'
        res.master = {
          name: 'xxxx'
        }
        if(this.detailId){
          apiUrl = 'updateGrave'
        }
        await api[apiUrl](res);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.$router.push({
          name: 'graveIndex'
        })
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
