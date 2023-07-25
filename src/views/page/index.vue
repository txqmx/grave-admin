<template>
  <div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
    >
      <template #tableAction>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
    </table-container>
    <dialog-container
      v-model="showModal"
      :title="defaultData.id ? '编辑' : '新增'"
      @close="close"
      @submit="submit"
    >
      <form-container
        v-if="showModal"
        ref="formContainer"
        :formDesc="formDesc"
        :defaultData="defaultData"
        :row="1"
        label-width="80px"
        input-width="200px"
      >
      </form-container>
    </dialog-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api';
export default defineComponent({
  data() {
    return {
      showModal: false,
      tableDesc: [
        {
          prop: 'name',
          label: '名字',
          defaultVaule: (row) => {
            return row['name'];
          },
        },
        {
          prop: 'template_name',
          label: '模板',
        },
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/page/list',
          data: {},
        },
        action: [
          {
            type: 'edit',
            name: '进入详情',
            actionFn: this.handleEdit,
          },
          {
            type: 'delete',
            name: '删除',
            actionApi: {
              method: 'post',
              url: '/api/page/delete',
            },
          },
        ],
      },
      defaultData: {},
      formDesc: [
        {
          type: 'InputEditor',
          label: '名字',
          field: 'name',
          rules: { required: true },
        },
        {
          type: 'SelectEditor',
          label: '模板',
          field: 'template_id',
          options: this.getTemplateList,
          rules: { required: true },
        },
      ],
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    // 获取列表
    getTableList() {
      this.$refs.tableContainer.getTableList();
    },

    async getTemplateList() {
      let dataSource = {
        method: 'get',
        url: '/api/pageTemplate/list',
      };
      return await api.axios(dataSource);
    },

    // 编辑
    handleEdit(row) {
      this.$router.push({
        name: 'pageDetail',
        query: { id: row.id },
      });
    },

    // 新增
    handleAdd() {
      this.showModal = true;
    },
    // 提交
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let dataSource = {
          method: 'post',
          url: '/api/page/create',
        };
        let params = { ...res };
        await api.axios(dataSource, params);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.close();
        this.getTableList();
      });
    },

    // 关闭弹窗
    close() {
      this.showModal = false;
      this.defaultData = {};
    },
  },
});
</script>

<style lang="scss" scoped></style>
