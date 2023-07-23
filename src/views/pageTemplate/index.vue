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
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api';
export default defineComponent({
  data() {
    return {
      tableDesc: [
        {
          prop: 'name',
          label: '名字',
          defaultVaule: (row) => {
            return row['name'];
          },
        },
        {
          prop: 'template_id',
          label: '模板',
        },
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/pageTemplate/list',
          data: {},
        },
        action: [
          {
            type: 'edit',
            name: '编辑',
            actionFn: this.handleEdit,
          },
          {
            type: 'delete',
            name: '删除',
            actionApi: {
              method: 'post',
              url: '/api/pageTemplate/delete'
            },
          },
        ],
      },
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

    // 编辑
    handleEdit(row) {
      this.$router.push({
        name: 'pageTemplateDetail',
        query:{ id: row.id}
      })
    },

    // 新增
    handleAdd() {
      this.$router.push({
        name: 'pageTemplateDetail',
      })
    }
  },
});
</script>

<style lang="scss" scoped></style>
