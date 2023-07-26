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
      :title="defaultData.id ? '修改' : '新增'"
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
import { defineComponent, ref, computed } from 'vue';
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
          prop: 'user_name',
          label: '用户名',
        },
        {
          prop: 'remark',
          label: '备注',
        },
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/admin/user/list',
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
              url: '/api/admin/user/delete'
            },
          },
        ],
      },
      formDesc: [
        {
          type: 'InputEditor',
          label: '用户名',
          field: 'user_name',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '密码',
          field: 'password',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '别名',
          field: 'name',
        },
        
      ],
      defaultData: {},
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
      this.defaultData = {...row}
      this.showModal = true
    },

    // 新增
    handleAdd() {
      this.showModal = true;
    },
    
    // 保存
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let dataSource = {
          method: 'post',
          url: '/api/admin/user/create',
        }
        let params = {...res}
        if(this.defaultData.id){
          dataSource.url = '/api/admin/user/update'
          params.id = this.defaultData.id
        }
        await api.axios(dataSource,params);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.close()
        this.getTableList()
      });
    },

    // 关闭弹窗
    close(){
      this.showModal = false
      this.defaultData = {}
    },
  },
});
</script>

<style lang="scss" scoped></style>
