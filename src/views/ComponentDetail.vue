<template>
  <div class="user-manage">
    <!-- <el-input
      v-model="detail"
      :rows="30"
      type="textarea"
      placeholder="Please input"
    /> -->
    <codeJson v-if="detail" v-model="detail"></codeJson>
    <!-- <div v-if="formData">
      LvBannerView
      <el-form :model="formData.LvBannerView" label-width="120px">
        <el-form-item label="族谱名称">
          <el-input v-model="formData.LvBannerView.title" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formData.LvBannerView.info" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formData.LvBannerView.address" />
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            :action="`${baseUrl}/api/file/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="formData.LvBannerView.img" :src="formData.LvBannerView.img" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
    </div> -->
    <el-button type="primary" @click="updatePage">修改</el-button>
  </div>
</template>

<script>
import api from '../api';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import codeJson from '../components/Editor/codeJson.vue'
import {baseUrl} from '../api/index.js'
export default defineComponent({
  name: 'ComponentDetail',
  components: { Plus,codeJson },
  data() {
    return {
      pageId: this.$route.query.id,
      detail: '',
      baseUrl: baseUrl,
      formData: {
        LvBannerView: {},
        LvSwiper: {}
      },
    };
  },
  created() {
    this.$store.commit('setBackRoute', {
      name: 'ComponentList',
    });
    this.getPageDetail();
  },
  methods: {
    async getPageDetail() {
      let data = await api.getComponentDetail({
        id: this.pageId,
      });
      this.detail = data.config || {};
      // let detail = JSON.parse(this.detail)
      // detail.forEach(item => {
      //   this.formData[item.type] = item.data
      // })
    },
    async updatePage() {
      await api.getComponentUpdate({
        id: this.pageId,
        config: this.detail,
      });
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
    },
    handleAvatarSuccess(response){
      if (response.status === 200) {
        this.formData.LvBannerView.img = response.data.fileUrl;
      }
    }
  },
});
</script>

<style lang="scss">
// .user-manage{

// }
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 100px;
  height: 100px;
  img{
    width: 100%;
  }
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
