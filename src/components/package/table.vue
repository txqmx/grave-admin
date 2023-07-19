<template>
  <div class="base-table">
    <div class="table-action">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="tableList">
      <el-table-column
        v-for="item in tableDesc"
        :key="item.prop"
        :label="item.label"
      >
        <template #default="scope">
          {{
            item.defaultVaule
              ? item.defaultVaule(scope.row)
              : scope.row[item.prop]
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <slot name="action" :row="scope.row"></slot>
          <el-button
            v-if="config.action.includes('detail')"
            type="text"
            @click="handleDetail(scope.row)"
          >
            详情
          </el-button>
          <el-button
            v-if="config.action.includes('edit')"
            type="text"
            @click="handleEdit(scope.row)"
          >
            修改
          </el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import api from '@/api';
export default defineComponent({
  name: 'TableContainer',
  data() {
    return {
      cacheParam: {},
      tableList: [],
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
    handleAdd(){
      this.$emit('add');
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
.base-table{
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  .table-action{
    margin-bottom: 16px;
  }
}

</style>
