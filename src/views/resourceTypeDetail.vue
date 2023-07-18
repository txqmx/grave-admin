<template>
  <div>
    <div class="header">
      <el-button @click="add"> 新增 </el-button>
    </div>
    <div v-if="dataType === 'text'">
      <table-container
        ref="tableContainer"
        :tableDesc="tableDesc"
        :config="tableConfig"
        @delete="deleteItem"
        @detail="editItem"
      ></table-container>
    </div>
    <div v-else>
      <img-card
        v-for="item in imgList"
        :key="item.id"
        :info="item"
        @edit="editItem"
        @delete="deleteItem"
      ></img-card>
    </div>
    <dialog-container
      v-if="showModal"
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
import ImgCard from '../components/ImgCard.vue';
import api from '@/api';
export default defineComponent({
  data() {
    return {
      dataType: this.$route.query.dataType,
      code: this.$route.query.code,
      imgList: [],
      showModal: false,
      defaultData: {},
      formDesc: [
        {
          type: 'InputEditor',
          label: '标题',
          field: 'name',
        },
        {
          type: 'TextEditor',
          label: '简介',
          field: 'info',
        },
        {
          type: 'FileUploadEditor',
          label: '图片',
          field: 'cover',
          rules: { required: true },
          attrs: {
            type: 'img',
            corpper: this.$route.query.dataType !== 'img',
            multiple: false,
            corpperScale: [330, 160],
            limit: 1,
          },
        },
        {
          type: 'FileUploadEditor',
          label: '文件',
          field: 'enclosure',
          multiple: false,
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
          url: '/api/articles/queryList',
          data: {},
        },
        action: ['detail', 'delete'],
      },
    };
  },
  components: { ImgCard },
  mounted() {
    this.$store.commit('setBackRoute', {
      name: 'ResourceTypeList',
    });
    this.getResourceList();
  },
  methods: {
    async getResourceList() {
      if (this.dataType === 'text') {
        this.$refs.tableContainer.getTableList({ type: this.code });
      } else {
        this.imgList = await api.getResourceList({ type: this.code });
      }
    },
    add() {
      if (this.dataType === 'text') {
        this.$router.push({
          name: 'ResourceDetail',
          query: {
            ...this.$route.query,
          },
        });
      } else {
        this.defaultData = {};
        this.showModal = true;
      }
    },
    closeDialog() {
      this.defaultData = {};
      this.showModal = false;
    },
    addSubmit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        if (res.id) {
          await api.updateResource(res);
        } else {
          await api.addResource({
            ...res,
            type: this.code,
            dataType: this.dataType,
          });
        }

        ElMessage({
          message: res.id ? '修改成功' : '新增成功',
          type: 'success',
        });
        this.getResourceList();
        this.closeDialog();
      });
    },
    async deleteItem(row) {
      await api.deleteResource({ id: row.id });
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
      this.getResourceList();
    },
    async editItem(row) {
      if (this.dataType === 'text') {
        this.$router.push({
          name: 'ResourceDetail',
          query: {
            id: row.id,
            ...this.$route.query,
          },
        });
      } else {
        let defaultData = await api.getResourceDetail({ id: row.id });
        this.defaultData = defaultData;
        this.showModal = true;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 10px;
}
</style>
