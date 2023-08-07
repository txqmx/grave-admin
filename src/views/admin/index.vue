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
        label-width="100px"
        input-width="200px"
      >
      </form-container>
    </dialog-container>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { mapState,mapActions } from 'vuex';
import api from '@/api';
export default defineComponent({
  data() {
    return {
      showModal: false,
      tableDesc: [
        {
          prop: 'user_name',
          label: '用户名',
        },
        {
          prop: 'name',
          label: '公司名',
          defaultVaule: (row) => {
            return row['name'];
          },
        },
        {
          prop: 'code',
          label: '编码',
          attrs: {
            disabled: (row) => {
              return !!row.id;
            },
          },
        },
        {
          prop: 'phone',
          label: '电话',
        },
        {
          prop: 'grave_limit',
          label: '墓碑数量',
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
          label: '公司名',
          field: 'name',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '编码',
          field: 'code',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '电话',
          field: 'phone',
          rules: { required: true },
        },
        {
          type: 'InputEditor',
          label: '墓碑数量',
          field: 'grave_limit',
          attrs:{
            type: 'number'
          }
        },
        {
          type: 'TextEditor',
          label: '备注',
          field: 'remark',
        },
        
      ],
      defaultData: {},
    };
  },
  mounted() {
    this.getTableList();
  },
  computed: {
    ...mapState(['userInfo']),
  },
  
  methods: {
    ...mapActions(['getUserInfo']),
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
        if(this.defaultData.id && this.defaultData.id === this.userInfo.id){
          this.getUserInfo()
        }
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
