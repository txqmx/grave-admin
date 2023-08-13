<template>
  <div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
      @add="handleAdd"
    >
      <template #tableAction="scope">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        可创建数量({{ scope.total+ '/' + userInfo.grave_limit }})
      </template>
      <template #columnAction="scope">
        <el-button type="text" @click="handSelect(scope.row)"
          >选中</el-button
        >
        <el-button type="text" @click="handEdit(scope.row)">编辑</el-button>
        <el-popover
          placement="top"
          :width="100"
          trigger="click"
        >
        <div class="popover_container">
          <el-image style="width: 100px; height: 100px" :src="qrcode.qr_code" :fit="fit" />
          <div>
            <el-button type="text" @click="downloadQrcode(scope.row)">下载</el-button>
            <el-button type="text" @click="preview()">预览</el-button>
          </div>
        </div>
          <template #reference>
            <el-button type="text" @click="showQrcode(scope.row)">二维码</el-button>
          </template>
        </el-popover>
      </template>
    </table-container>
    <dialog-container
      v-model="showModal"
      :title="defaultData.id ? '编辑' : '新增'"
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
      <template #code="{data}">
        <el-input style="width: 200px" v-model=data.code>
          <template #prepend>{{userInfo.code}}</template>
        </el-input>
        <el-button type="text" @click="autoCreate(data)">随机生成</el-button>
      </template>
      
      </form-container>
    </dialog-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
import {downloadFileByBase64} from '@/utils/download'
import api from "@/api";
import { mapState,mapMutations } from "vuex";
export default defineComponent({
  data() {
    return {
      showModal: false,
      tableDesc: [
        {
          prop: "name",
          label: "名字",
          defaultVaule: (row) => {
            return row["name"];
          },
        },
        {
          prop: "code",
          label: "编码",
        },
      ],
      tableConfig: {
        dataSource: {
          method: "get",
          url: "/api/admin/grave/list",
          data: {},
        },
        action: [],
      },
      defaultData: {},
      formDesc: [
        {
          type: "InputEditor",
          label: "编码",
          field: "code",
          rules: { required: true },
          slot: true,
          attrs: {
            disabled: (row) => {
              return !!row.id;
            },
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
      ],
      qrcode:{}
    };
  },
  mounted() {
    this.getTableList();
  },
  computed:{
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations(["setGraveInfo"]),
    // 获取列表
    getTableList() {
      this.$refs.tableContainer.getTableList();
    },
    // 编辑
    handEdit(row) {
      // this.defaultData = { ...row };
      // this.showModal = true;
      this.$router.push({
        name: 'graveDetail',
        query: { id: row.id },
      });
    },
    // 选择
    handSelect(row) {
      this.setGraveInfo(row);
      // this.$router.push({
      //   name: "home",
      // });
    },
    // 新增
    handleAdd() {
      this.defaultData = {
        code: this.random()
      }
      this.showModal = true;
    },
    // 提交
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let apiUrl = "createGrave";
        if (this.defaultData.id) {
          apiUrl = "updateGrave";
        } else {
          res.code = this.userInfo.code + res.code
        }
        await api[apiUrl](res);
        ElMessage({
          message: "保存成功",
          type: "success",
        });
        this.close();
        this.getTableList();
      });
    },
    // 关闭弹窗
    close() {
      this.showModal = false;
      this.defaultData = {};
    },
    // 查看二维码
    async showQrcode(row) {
      let res = await api.getQrcode({ id: row.id });
      this.qrcode = res || {};
    },
    // 下载二维码
    downloadQrcode(row){
      if(this.qrcode&& this.qrcode.qr_code){
        downloadFileByBase64(this.qrcode.qr_code, row.name)
      }
    },
    // 生成随机数
    random(){
      return Math.round(Math.random() * 100000000)
    },
    // 自动生成编码
    autoCreate(formData){
      formData.code = this.random()
    },
    preview(){
      
    }
  },
});
</script>

<style lang="scss" scoped>

.popover_container{
  width: 100%;
  text-align: center;
}
</style>

<style>
.el-popover.el-popper{
  min-width: 100px;
}
</style>