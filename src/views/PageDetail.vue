<template>
  <div class="user-manage">
    <el-row :gutter="20">
      <el-col :span="6" class="editor-item">
        <h3>组件库</h3>
        <Draggable class="list-group" :list="list1" group="people">
          <template #item="{ element, index }">
            <div class="list-group-item">
              {{ element.name }}
            </div>
          </template>
        </Draggable>
      </el-col>

      <el-col :span="6" class="editor-item">
        <h3>页面</h3>
        <Draggable class="list-group" :list="list2" group="people" @add="add">
          <template #item="{ element, index }">
            <div class="list-group-item" @click="selectItem(element)">
              {{ element.name }}
            </div>
          </template>
        </Draggable>
      </el-col>
      <el-col :span="12" class="editor-item">
        <div v-for="item in config" :key="item">
          <label>{{ item.label }}</label>
          <template v-if="item.type === 'text'">
            <el-input v-model="item.value"></el-input>
          </template>
          <template v-if="item.type === 'img'">
            <FileUploadEditor
              v-model="item.value"
              type="img"
              folder="home"
              :multiple="true"
              :corpperScale="[357, 150]"
            ></FileUploadEditor>
          </template>
        </div>
        <el-button type="primary" @click="handleSave">预览</el-button>
      </el-col>
    </el-row>
    <el-dialog v-model="visible" title="预览" width="70%" top="5vh">
      <codeJson v-if="detail" v-model="detail"></codeJson>
      <template #footer>
        <el-button type="primary" @click="updatePage">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import Draggable from 'vuedraggable';
import codeJson from '../components/Editor/codeJson.vue';
import ImgUpload from '../components/ImgUpload.vue';
import { baseUrl } from '../api/index.js';
export default defineComponent({
  name: 'PageDetail',
  components: { Plus, codeJson, Draggable, ImgUpload },
  data() {
    return {
      pageId: this.$route.query.id,
      detail: '',
      baseUrl: baseUrl,
      formData: {
        LvBannerView: {},
        LvSwiper: {},
      },
      list1: [],
      list2: [],
      config: {},
      fileList: [],
      visible: false,
    };
  },
  mounted() {
    this.getPageDetail();
  },
  created() {
    
  },
  methods: {
    async getComponentList() {
      let data = await api.getComponentList();
      let comList = this.list2.map((item) => item.id);

      this.list1 = data
        .filter((item) => !comList.includes(item.id))
        .map((item) => {
          let config = JSON.parse(item.config);
          let data = {};
          for (let i in config) {
            data[i] = config[i].value;
          }
          return {
            id: item.id,
            name: item.name,
            type: item.name,
            data: JSON.parse(item.config),
          };
        });
      // this.detail = data.detail;
    },
    async getPageDetail() {
      let data = await api.getPageDetail({
        id: this.pageId,
      });
      this.list2 = data.detail;
      // this.detail = data.detail;
      this.getComponentList();
      // let detail = JSON.parse(this.detail)
      // detail.forEach(item => {
      //   this.formData[item.type] = item.data
      // })
    },
    async updatePage() {
      await api.getPageUpdate({
        id: this.pageId,
        detail: this.detail,
      });
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
    },
    add(e) {
      let item = e.item._underlying_vm_;
      for (let i in item.data) {
        item.data[i].value = item.data[i].defaultValue;
      }
    },
    selectItem(item) {
      this.config = item.data;
    },
    handleSave() {
      this.visible = true;
      this.detail = '';
      this.$nextTick(() => {
        this.detail = this.list2;
      });
    },
  },
});
</script>

<style lang="scss">
.editor-item {
  height: 500px;
  background: #ffffff;
}

.list-group {
  height: 450px;
  border: 1px solid rgb(89, 88, 88);
}

.list-group-item {
  margin: 10px;
  height: 50px;
  border: 1px solid rgb(89, 88, 88);
}
</style>
