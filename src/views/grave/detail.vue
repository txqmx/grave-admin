<template>
  <div class="family-container">
    <form-container
      ref="formContainer"
      :formDesc="formDesc"
      :defaultData="defaultData"
      label-width="60px"
      input-width="200px"
    >
    </form-container>
    <div class="footer_container">
      <el-button type="primary"  @click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { defineComponent, ref, computed } from 'vue';
import { mapState, mapMutations } from 'vuex';
import { ElMessage } from 'element-plus';
import { getUrlParam } from '@/utils/Url'

export default defineComponent({
  data() {
    return {
      detailId: '',
      defaultData: {},
      formDesc: [
      {
          type: 'FileUploadEditor',
          label: '封面',
          field: 'cover',
          attrs: {
            type: 'img',
            corpper: true,
            corpperScale: [300, 150],
            multiple: false,
            folder: 'avatar',
          },
        },
        {
          type: 'InputEditor',
          label: '地址',
          field: 'address',
        },
        {
          type: 'TextEditor',
          label: '简介',
          field: 'desc',
        },
        {
          type: 'RichEditor',
          label: '详情',
          field: 'detail',
        },
      ],
    };
  },

  created(){
    this.detailId = this.graveInfo.id
    this.getDetailInfo()
  },
  computed: {
    ...mapState(['graveInfo'])
  },
  methods: {
    async getDetailInfo(){
      let res = await api.getGraveInfo({
        id: this.detailId
      });
      this.defaultData = res
    },
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        await api.updateGrave(res);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.getDetailInfo()
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.family-container {
  padding: 20px;
  background: #ffffff;
  .footer_container{
    // position: fixed;
    padding: 0 60px;
  }
}
</style>
