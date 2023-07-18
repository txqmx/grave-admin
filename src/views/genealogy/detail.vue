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
      defaultData: {},
      formDesc: [
        // {
        //   type: 'InputEditor',
        //   label: 'id',
        //   field: 'id',
        //   rules: { required: true },
        //   attrs: { disabled: true },
        // },
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
          label: '描述',
          field: 'desc',
        },
        {
          type: 'RichEditor',
          label: '内容',
          field: 'detail',
        },
      ],
    };
  },
  created(){
    this.$store.commit('setBackRoute', {
      name: 'Genealogy',
    });
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
  padding: 20px;
  background: #ffffff;
}
</style>
