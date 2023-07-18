<template>
  <div class="user-manage">
    <div class="base-table">
      <el-table :data="tableList">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="text"
              @click="handleClick(scope.row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from '../api';
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'PageList',
  setup() {
    const router = useRouter();
    const store = useStore();
    const tableList = ref([]);
    // 查询
    const handleQuery = async () => {
      tableList.value = await api.getPageList();
    };
    handleQuery();
    // 选定
    const handleClick = (row) => {
      router.push({path: '/pageDetail', query:{
        id: row.id
      }});
    };

    return {
      familyId: computed(() => store.getters.familyId),
      tableList,
      handleQuery,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
// .user-manage{

// }
</style>
