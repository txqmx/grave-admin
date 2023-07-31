<template>
  <div class="family-container">
    <div v-for="item in config" :key="item.name">
      <div class="form_title">{{ item.name }}</div>
      <form-container
        :ref="item.dataSource"
        :formDesc="item.fields"
        :defaultData="parseParams(item)"
        :scope-name="item.dataSource"
        label-width="100px"
        input-width="200px"
      >
      </form-container>
    </div>
    <el-button type="primary" @click="submit">提交</el-button>
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
      defaultData: {},
      config: [],
      configData: {},
    };
  },
  async created() {
    if (this.detailId) {
      await this.getDetailInfo();
    }
    this.getTemplateInfo();
  },
  methods: {
    // 获取详情
    async getDetailInfo() {
      let dataSource = {
        method: 'get',
        url: '/api/admin/page/detail',
      };
      let params = {
        id: this.detailId,
      };
      let res = await api.axios(dataSource, params);
      this.defaultData = res;
    },
    // 获取配置
    async getTemplateInfo() {
      let dataSource = {
        method: 'get',
        url: '/api/admin/pageTemplate/detail',
      };
      let params = {
        id: this.defaultData.template_id,
      };
      let res = await api.axios(dataSource, params);
      this.config = JSON.parse(res.config);
    },

    // 解析配置默认字段
    parseParams(row) {
      let data = this.defaultData.content
        ? JSON.parse(this.defaultData.content)
        : {};
      let params = {};
      row.fields.forEach((item) => {
        params[item.field] = '';
      });
      if (data[row.dataSource]) {
        params = { ...params, ...data[row.dataSource] };
      }
      return params;
    },

    // 处理配置内容
    async parseContent() {
      let names = [];
      let promises = [];
      this.config.forEach((item) => {
        names.push(item.dataSource);
        promises.push(this.$refs[item.dataSource].submitForm());
      });
      let resArr = await Promise.all(promises);
      return resArr.reduce((prev, cur) => {
        return { ...prev, ...cur };
      });
    },

    // 保存
    async submit() {
      let dataSource = {
        method: 'post',
        url: '/api/admin/page/update',
      };
      let content = await this.parseContent();
      let params = {
        ...this.defaultData,
        content: JSON.stringify(content),
      };
      await api.axios(dataSource, params);
      ElMessage({
        message: '保存成功',
        type: 'success',
      });
      this.$router.replace(this.$route.meta.backRoute);
    },
  },
});
</script>

<style lang="scss">
.family-container {
  padding: 20px;
  background: #ffffff;
  .form_title {
    margin: 10px 0 18px;
  }
}
</style>
