<template>
  <div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
      @add="handleAdd"
    >
    <template #action="scope">
      <el-button type="text" @click="handSelect(scope.row)">进入</el-button>
      <el-button type="text" @click="handEdit(scope.row)">修改</el-button>
    </template>
    </table-container>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api';
import { mapMutations } from 'vuex'
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
        action: [],
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
    ...mapMutations(['setGraveInfo']),
    getTableList() {
      this.$refs.tableContainer.getTableList();
    },
    handEdit(row){
      this.$router.push({
        name: 'graveDetail'
      })
    },
    handSelect(row){
      this.setGraveInfo(row)
      this.$router.push({
        name: 'home'
      })
    },
    handleAdd(){
      this.$router.push({
        name: 'graveDetail'
      })
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
