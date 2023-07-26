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
      <template #columnAction="scope">
        <el-button type="text" @click="handleEdit(scope.row)"
          >进入详情</el-button
        >
        <el-button type="text" @click="handChangeStatus(scope.row)">{{scope.row.is_active ? '停用': '启用'}}</el-button>
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
        {
          prop: 'is_active',
          label: '启用状态',
          defaultVaule: (row) => {
            return row.is_active ? '是' : '否';
          },
        },
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/admin/page/list',
          data: {},
        },
        action: [
          {
            type: 'delete',
            name: '删除',
            actionApi: {
              method: 'post',
              url: '/api/admin/page/delete',
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
        url: '/api/admin/pageTemplate/list',
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
          url: '/api/admin/page/create',
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

    // 启用
    async handChangeStatus(row){
      let dataSource = {
        method: 'post',
        url: '/api/admin/page/changeStatus',
      };
      let params = {
        id: row.id,
        is_active: row.is_active? 0 : 1,
      };
      await api.axios(dataSource, params);
      ElMessage({
        message: '保存成功',
        type: 'success',
      });
      this.getTableList();
    }
  },
});
</script>

<style lang="scss" scoped></style>
