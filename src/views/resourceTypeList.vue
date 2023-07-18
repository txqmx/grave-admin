<template>
  <div>
    <div class="header">
      <el-button @click="add"> 新增 </el-button>
    </div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
      @delete="deleteItem"
      @detail="detailItem"
      @edit="editItem"
    >
    </table-container>
    <dialog-container
      :showModal="showModal"
      :title="defaultData.id ? '修改' : '新增'"
      @close="closeDialog"
      @submit="addSubmit"
    >
      <form-container
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
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api';
export default defineComponent({
  data() {
    return {
      showModal: false,
      defaultData: {},
      tableDesc: [
        {
          prop: 'id',
          label: 'id',
        },
        {
          prop: 'code',
          label: '编码',
        },
        {
          prop: 'name',
          label: '名字',
        },
        {
          prop: 'dataType',
          label: '类型',
          defaultVaule: (row) => {
            return row['dataType'];
          },
        },
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/resourceType/queryList',
          data: {},
        },
        action: ['edit', 'detail', 'delete'],
      },
      formDesc: [
        {
          type: 'InputEditor',
          label: '编码',
          field: 'code',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '名字',
          field: 'name',
          rules: { required: true },
        },
        {
          type: 'SelectEditor',
          label: '类型',
          field: 'dataType',
          rules: { required: true },
          options: [
            {
              value: 'text',
              label: '文章集',
            },
            {
              value: 'img',
              label: '图片集',
            },
            {
              value: 'video',
              label: '视频影像',
            },
          ],
        },
        {
          type: 'FileUploadEditor',
          label: '封面',
          field: 'cover',
          attrs: {
            type: 'img',
            corpper: true,
            multiple: false,
            corpperScale: [330, 160],
            limit: 1,
          },
        },
      ],
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.$refs.tableContainer.getTableList();
    },
    add() {
      this.showModal = true;
    },
    closeDialog() {
      this.defaultData = {};
      this.showModal = false;
    },
    addSubmit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        if (res.id) {
          await api.updateResourceType(res);
        } else {
          await api.addResourceType(res);
        }

        ElMessage({
          message: res.id ? '修改成功' : '新增成功',
          type: 'success',
        });
        this.getTableList();
        this.showModal = false;
      });
    },
    async deleteItem(row) {
      await api.deleteResourceType({ id: row.id });
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
      this.getTableList();
    },
    async detailItem(row) {
      this.$router.push({
        name: 'ResourceTypeDetail',
        query: {
          dataType: row.dataType,
          code: row.code,
        },
      });
    },
    async editItem(row) {
      this.defaultData = await api.getResourceTypeDetail({ id: row.id });
      this.showModal = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 10px;
}
</style>
