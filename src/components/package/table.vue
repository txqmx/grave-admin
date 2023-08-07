<template>
  <div class="base-table">
    <div class="table-action">
      <slot name="tableAction" :total="tableList.length"></slot>
    </div>
    <el-table :data="tableList">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column v-for="item in tableDesc" :key="item.prop" :label="item.label">
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
          <slot name="columnAction" :row="scope.row"></slot>
          <template v-for="item in columnAction" :key="item.type">
            <el-button type="text" @click="handleActionClick(item, scope.row)">
              {{ item.name }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
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
        dataSource: () => { },
        action: () => [],
      },
    },
  },
  computed: {
    columnAction() {
      return this.config.action;
    },
  },
  methods: {
    async getTableList(param) {
      this.cacheParam = param;
      let dataSource = {
        ...this.config.dataSource,
      };
      let params = { ...dataSource.data, ...this.cacheParam };
      this.tableList = await api.axios(dataSource,params);
    },

    // 解析点击事件
    async handleActionClick(action, row) {
      if(action.type === 'delete' && action.actionApi){
        await this.handleDelete(action, row)
      }
      if (action.actionFn && typeof action.actionFn === 'function') {
        await action.actionFn(row)
      }
      this.$emit(action.type, row);
    },

    // 默认删除事件
    handleDelete(action,row) {
      ElMessageBox.confirm(
        '确定删除该条内容?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async () => {
          let params = {id: row.id}
          await api.axios(action.actionApi, params);
          this.getTableList()
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        })
    }
  },
});
</script>

<style lang="scss" scoped>
.base-table {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;

  .table-action {
    color: #606266;
    margin-bottom: 16px;
  }
}
</style>
