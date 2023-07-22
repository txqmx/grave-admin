<template>
  <div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
    ></table-container>
    <form-container
      ref="formContainer"
      :formDesc="formDesc"
      :defaultData="defaultData"
      label-width="80px"
      input-width="200px"
    >
    </form-container>
    <div class="foot_container">
      <el-button @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  name: 'test',
  data() {
    return {
      pageId: this.$route.query.id,
      currentRow: '',
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
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/resourceType/queryList',
          data: {},
        },
      },
    };
  },
  created() {
    this.getMemberItem(this.pageId);
  },
  mounted() {
    this.$refs.tableContainer.getTableList();
  },
  methods: {
    async getMemberItem(id) {
      const res = await api.getMemberItem({
        id,
        child: true,
        mate: true,
      });
      res.avatatUrl = [
        {
          url: res.avatatUrl,
        },
      ];
      this.defaultData = res;
      console.log(this.defaultData);
    },
    async getList() {
      return await api.getComponentList();
    },
    submit() {
      this.$refs.formContainer.submitForm().then((res) => {
        console.log(res);
      });
    },
  },
});
</script>

<style lang="scss"></style>
