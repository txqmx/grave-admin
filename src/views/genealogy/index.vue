<template>
  <div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
      @add="handleAdd"
    >
    <template #action="scope">
      <el-button type="text" @click="handSelect(scope.row)">选中</el-button>
    </template>
    </table-container>
    <dialog-container
      v-if="showModal"
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
      tableDesc: [
        {
          prop: 'id',
          label: 'id',
        },
        {
          prop: 'name',
          label: '名字',
          defaultVaule: (row) => {
            return row['name'];
          },
        },
        {
          prop: 'code',
          label: '编码',
        },
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/grave/list',
          data: {},
        },
        action: ['edit', 'detail', 'delete'],
      },
      defaultData:{},
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
        }
      ],
    };
  },
  mounted(){
    this.getTableList()
  },
  methods:{
    getTableList() {
      this.$refs.tableContainer.getTableList();
    },
    handSelect(row){
      console.log(row)
    },
    handleAdd(){
      this.showModal = true;
        // this.$router.push({
        //     name: 'GenealogyDetail'
        // })
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
          await api.createGrave(res);
        }

        ElMessage({
          message: res.id ? '修改成功' : '新增成功',
          type: 'success',
        });
        this.getTableList();
        this.showModal = false;
      });
    },
  }
});
</script>

<style lang="scss" scoped></style>
