<template>
  <div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
      @add="handleAdd"
    >
      <template #tableAction>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
      <template #columnAction="scope">
        <el-button type="text" @click="handSelect(scope.row)"
          >进入详情</el-button
        >
        <el-button type="text" @click="handEdit(scope.row)">编辑</el-button>
        <el-popover
          placement="top"
          :width="200"
          trigger="click"
        >
        <div>
          <el-image style="width: 100px; height: 100px" :src="qrcode.qr_code" :fit="fit" />
        </div>
          <template #reference>
            <el-button type="text" @click="showQrcode(scope.row)"
              >二维码</el-button
            >
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
      </form-container>
    </dialog-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
import api from "@/api";
import { mapMutations } from "vuex";
export default defineComponent({
  data() {
    return {
      showModal: false,
      tableDesc: [
        {
          prop: "id",
          label: "id",
        },
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
    this.setGraveInfo("");
    this.getTableList();
  },
  methods: {
    ...mapMutations(["setGraveInfo"]),
    // 获取列表
    getTableList() {
      this.$refs.tableContainer.getTableList();
    },
    // 编辑
    handEdit(row) {
      this.defaultData = { ...row };
      this.showModal = true;
    },
    // 选择
    handSelect(row) {
      this.setGraveInfo(row);
      this.$router.push({
        name: "home",
      });
    },
    // 新增
    handleAdd() {
      this.showModal = true;
    },
    // 提交
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let apiUrl = "createGrave";
        if (this.defaultData.id) {
          apiUrl = "updateGrave";
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
  },
});
</script>

<style lang="scss" scoped></style>
