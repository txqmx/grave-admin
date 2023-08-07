<template>
  <div class="grave_mobile_container">
    <div class="grave_navbar">铭志码管理系统</div>
    <div class="grave_content">
      <div class="content_card">
        <div class="title">管理员信息</div>
        <div class="content">
          <el-row>
            <el-col :span="24">用户名: {{ userInfo.user_name || '-' }}</el-col>
            <el-col :span="24"> 编码: {{ userInfo.code || '-' }} </el-col>
            <el-col :span="24"> 别名: {{ userInfo.name || '-' }} </el-col>
          </el-row>
        </div>
      </div>
      <div class="content_card">
        <div class="title">墓碑管理</div>
        <div class="content">
          <el-row>
            <el-col :span="24">
              可创建数量({{ tableList.length + '/' + userInfo.grave_limit }})
            </el-col>
          </el-row>
          <el-table :data="tableList" style="width: 100%">
            <el-table-column prop="name" label="名字" show-overflow-tooltip />
            <el-table-column prop="code" label="编码" show-overflow-tooltip />
            <el-table-column label="操作" width="70">
              <template #default="scope">
                <el-button type="text" @click="handleClick(scope.row)"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog v-model="showModal" width="80%" align-center>
      <el-image
        style="width: 100%; height: 100%"
        :src="qrcode.qr_code"
        :fit="fit"
      />
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api';
import { mapState, mapMutations } from 'vuex';
export default defineComponent({
  data() {
    return {
      showModal: false,
      tableList: [],
      qrcode: {},
    };
  },
  mounted() {
    this.getTableList();
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations(['setGraveInfo']),

    // 获取列表
    async getTableList() {
      let dataSource = {
        method: 'get',
        url: '/api/admin/grave/list',
        data: {},
      };
      this.tableList = await api.axios(dataSource);
    },

    // 点击查看
    async handleClick(row) {
      let res = await api.getQrcode({ id: row.id });
      this.qrcode = res || {};
      this.showModal = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.grave_mobile_container {
  height: 100%;
  background: #eff2f5;
  overflow: hidden;
  .grave_navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    background: #ffffff;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    font-weight: 600;
  }
  .grave_content{
    height: calc(100% - 50px);
    box-sizing: border-box;
    overflow: auto;
    padding-top: 20px;
    // background: #ffffff;
    .content_card {
    padding: 0 10px 0;
    margin-bottom: 15px;
    border-radius: 5px;
    overflow: hidden;

    .title {
      font-size: 16px;
      color: #323233;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .content {
      padding: 4px 10px;
      border-radius: 4px;
      background: #ffffff;
      font-size: 14px;
      color: #6b7166;

      .el-row {
        .el-col {
          line-height: 40px;
          padding-left: 10px;
          border-bottom: 1px solid #ebedf0;
          &:last-child{
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      }
    }
  }
  }

  
}
</style>
