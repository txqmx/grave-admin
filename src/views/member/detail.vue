<template>
  <div class="family-container">
    <form-container
      ref="formContainer"
      :formDesc="formDesc"
      :defaultData="defaultData"
      label-width="100px"
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
import { getUrlParam } from '@/utils/Url';

export default defineComponent({
  data() {
    return {
      detailId: this.$route.query.id,
      type: this.$route.query.type,
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
          label: '身份',
          field: 'identity',
        },
        {
          type: 'SelectEditor',
          label: '性别',
          field: 'sex',
          options: [
            {
              id: 1,
              name: '男',
            },
            {
              id: 0,
              name: '女',
            },
          ],
        },
        {
          type: 'FileUploadEditor',
          label: '头像',
          field: 'avatar',
          attrs: {
            type: 'img',
            corpper: true,
          },
        },
        {
          type: 'RadioEditor',
          label: '是否去世',
          field: 'is_die'
        },
        {
          type: 'InputEditor',
          label: '出生日期',
          field: 'birth_time',
        },
        {
          type: 'InputEditor',
          label: '去世日期',
          field: 'die_time',
        },
        {
          type: 'TextEditor',
          label: '简介',
          field: 'desc',
        },
        {
          type: 'RichEditor',
          label: '详情',
          field: 'detail',
        },
      ],
    };
  },
  created() {
    // 设置返回路由
    this.$store.commit('setBackRoute', this.$route.meta.backRoute);

    if (this.detailId) {
      this.getDetailInfo();
    }
  },
  methods: {
    // 获取详情
    async getDetailInfo() {
      let dataSource = {
        method: 'get',
        url:
          this.type === 'mate'
            ? '/api/admin/mate/detail'
            : '/api/admin/member/detail',
      };
      let params = {
        id: this.detailId,
      };
      let res = await api.axios(dataSource, params);
      this.defaultData = res;
    },
    // 保存
    async submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let dataSource = {
          method: 'post',
          url: this.type === 'mate' ? '/api/admin/mate/update': '/api/admin/member/update'
        };
        let params = { ...res };
        let item = await api.axios(dataSource, params);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.$store.commit('setBackRoute', '');
        this.$router.replace(this.$route.meta.backRoute);
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
