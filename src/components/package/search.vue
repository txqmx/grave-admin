<template>
  <div class="base-table">
    <form-container
      ref="formContainer"
      :formDesc="formDesc"
      :defaultData="defaultData"
      label-width="80px"
      input-width="200px"
    >
    </form-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import api from '@/api';
export default defineComponent({
  name: 'SearchContainer',
  data() {
    return {
      cacheParam: {},
      tableList: [],
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
          type: 'DateEditor',
          label: '生年',
          field: 'birthDate',
        },
        {
          type: 'DateEditor',
          label: '卒年',
          field: 'dieDate',
        },
        {
          type: 'InputEditor',
          label: '层级',
          field: 'level',
          attrs: { disabled: true },
        },
        {
          type: 'InputEditor',
          label: '族谱',
          field: 'genealogyId',
          attrs: { disabled: true },
        },
        {
          type: 'FileUploadEditor',
          label: '头像',
          field: 'avatatUrl',
          attrs: {
            type: 'img',
            corpper: true,
            corpperScale: [300, 150],
            multiple: false,
            folder: 'avatar',
          },
        },
        {
          type: 'FileUploadEditor',
          label: '文件',
          field: 'avatatUrl',
          attrs: {},
        },
        {
          type: 'TextEditor',
          label: '简介',
          field: 'info',
        },
        {
          type: 'RichEditor',
          label: '简介',
          field: 'detail',
        },
      ],
    };
  },
  props: {
    tableDesc: {
      type: Array,
      required: true,
      default: () => [],
    },
    config: {
      default: {
        dataSource: () => {},
        action: ['edit', 'detail', 'delete'],
      },
    },
  },
  methods: {
    async getTableList(param) {
      this.cacheParam = param;
      let dataSource = {
        ...this.config.dataSource,
      };
      dataSource.data = { ...dataSource.data, ...this.cacheParam };
      this.tableList = await api.axios(dataSource);
    },
    handleDelete(row) {
      this.$emit('delete', row);
    },
    handleEdit(row) {
      this.$emit('edit', row);
    },
    handleDetail(row) {
      this.$emit('detail', row);
    },
  },
});
</script>

<style lang="scss" scoped>
.base-table {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  .table-action {
    margin-bottom: 16px;
  }
}
</style>
