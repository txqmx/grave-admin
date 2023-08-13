<template>
  <div class="family-container">
    <form-container
      ref="formContainer"
      :formDesc="formDesc"
      :defaultData="defaultData"
      label-width="100px"
      input-width="200px"
    >
    </form-container>
    <div class="footer_container">
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { mapMutations, mapState } from "vuex";
import { getUrlParam } from '@/utils/Url';

export default defineComponent({
  data() {
    return {
      detailId: this.$route.query.id,
      defaultData: {},
      formDesc: [
        // {
        //   type: 'FileUploadEditor',
        //   label: '封面',
        //   field: 'cover',
        //   attrs: {
        //     type: 'img',
        //     corpper: true,
        //     multiple: false,
        //   },
        // },
        {
          type: "InputEditor",
          label: "编码",
          field: "code",
          rules: { required: true },
          attrs: {
            disabled: true,
          },
        },
        {
          type: "InputEditor",
          label: "名字",
          field: "name",
          rules: { required: true },
        },
        {
          type: "InputEditor",
          label: "密码",
          field: "password",
        },
        {
          type: 'InputEditor',
          label: '墓碑地址',
          field: 'address',
          defaultValue: '',
        },
        {
          type: 'TextEditor',
          label: '简介',
          field: 'desc',
        },
        {
          type: 'RichEditor',
          label: '详情(墓志铭)',
          field: 'detail',
        },
      ],
    };
  },

  async created() {
    if (this.detailId) {
      await this.getDetailInfo();
    }
  },
  computed:{
    ...mapState(['graveInfo'])
  },
  methods: {
    ...mapMutations(["setGraveInfo"]),
    async getDetailInfo() {
      let res = await api.getGraveInfo({
        id: this.detailId,
      });
      this.defaultData = res;
    },
    submit() {
      this.$refs.formContainer.submitForm().then(async (params) => {
        let res = await api.updateGrave(params);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        if(this.graveInfo.id === res.id){
          this.setGraveInfo(res)
        }

        this.$router.replace(this.$route.meta.backRoute);
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.family-container {
  padding: 20px;
  background: #ffffff;
  .footer_container {
    // position: fixed;
    padding: 0 60px;
  }
}
</style>
