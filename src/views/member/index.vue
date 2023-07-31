<template>
  <div class="family-create-container">
    <div class="create-root">
      <!-- <el-button @click="handleAdd('root', currentRow)">增加父节点</el-button> -->
      <el-button :disabled="!currentRow.id" @click="handleAdd('child', currentRow)">添加后代</el-button>
      <el-button :disabled="!currentRow.id || currentRow.mateInfo" @click="handleAdd('mate', currentRow)">添加配偶
      </el-button>
      <!-- <el-button :disabled="!currentRow.id" @click="remove(currentRow)">删除</el-button> -->
    </div>
    <div class="family-content">
      <el-tree class="tree" 
        :data="treeData" 
        node-key="id" 
        default-expand-all 
        :expand-on-click-node="false"
        :highlight-current="true"
        @node-click="nodeClick">
        <template #default="{ data }">
          <span class="custom-tree-node">
            <span class="node-name">
              {{ data.name }}
              <el-icon @click="handleEdit(data, 'main')">
                <Edit />
              </el-icon>
            </span>
            <span v-if="data.mate" class="node-name">
              {{ data.mate && data.mate.name }}
              <el-icon @click="handleEdit(data.mate, 'mate')">
                <Edit />
              </el-icon>
            </span>
            <!-- <span>
              <el-button type="text" @click="addMember('child', data)">
                添加后代
              </el-button>
              <el-button
                type="text"
                :disabled="!!data.mateInfo"
                @click="addMember('mate', data)"
              >
                添加配偶
              </el-button>
              <el-button type="text" @click="remove(data)"> 删除 </el-button>
            </span> -->
          </span>
        </template>
      </el-tree>
    </div>
    <dialog-container v-model="showModal" :title="dialogTitle" @close="close" @submit="submit">
      <div v-if="addType !== 'root' && currentRow.id" class="default_form">
        <div class="default_form_item">
          <label class="label">{{ addType === 'child'? '父亲': '配偶'}}</label>
          <span>{{currentRow.name}}</span>
        </div>
      </div>
      <form-container v-if="showModal" ref="formContainer" :formDesc="formDesc" :defaultData="defaultData" :row="1"
        label-width="80px" input-width="200px">
      </form-container>
    </dialog-container>
  </div>
</template>

<script>
import api from '@/api';
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons-vue';
import { mapState, mapMutations } from 'vuex';
export default defineComponent({
  components: { Edit },
  data() {
    return {
      treeData: [],
      currentRow: {},
      addType: 'root',
      addTitle:{
        root: '新增父节点',
        child: '新增后代',
        mate: '新增配偶'
      },
      showModal: false,
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
      ],
    };
  },
  created() {
    this.getTreeData();
  },
  computed: {
    ...mapState(['graveInfo']),
    dialogTitle(){
      return this.addTitle[this.addType]
    }
  },
  methods: {
    async getTreeData() {
      let res = await api.getMemberTree();
      this.treeData = res;
    },
    // 选中节点
    nodeClick(row, node) { 
      this.currentRow = row
    },
    // 编辑
    handleEdit(row,type) { 
      this.$router.push({
        name: 'memberDetail',
        query:{
          id: row.id,
          type
        }
      })
    },
    // 添加
    handleAdd(type) {
      this.addType = type;
      this.defaultData = {
        identity: '配偶',
        sex: this.currentRow.sex === 1 ? 0: 1
      };
      this.showModal = true;
    },
    close() {
      this.showModal = false;
      this.defaultData = {};
    },
    submit() {
      this.$refs.formContainer.submitForm().then(async (res) => {
        let param = {
          grave_id: this.graveInfo.id,
          ...res
        };
        let apiUrl = 'createMember'
        if(this.addType === 'child'){
          param.pid = this.currentRow.id
        }
        if(this.addType === 'mate'){
          param.mate_id = this.currentRow.id
          apiUrl = 'createMate'
        }
        await api[apiUrl](param);
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        this.close()
        this.getTreeData()
      });
    },
    async remove(row) { 
      await api.deleteMember({id: row.id})
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
      this.getTreeData()
    },
  },
  beforeRouteEnter(to, from, next) {
    next((e) => {
      e.currentRow = {};
      if (to.params.reload) {
        e.getTreeData();
      }
    });
  },
});
</script>
<style lang="scss" scoped>
.family-create-container {
  position: relative;
  height: 100%;
  overflow: hidden;

  .create-root {
    margin-bottom: 10px;
  }

  .family-content {
    // display: flex;
    width: 100%;
    height: calc(100% - 42px);
    overflow: auto;
    background: #ffffff;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    font-size: 14px;
    padding-right: 6px;
    margin-left: 2px;

    .node-name {
      margin-right: 100px;
      display: flex;
      align-items: center;

      i {
        font-size: 16px;
        margin-left: 6px;
        color: #409eff;
      }
    }
  }

  .tree {
    display: inline-block;
    min-width: 100%;

    .el-tree-node__content {
      position: relative;
      height: 26px;
      line-height: 26px;
    }

    .el-tree-node__expand-icon {
      // 设置图标
      background-image: url('../assets/images/add.png');
      background-repeat: no-repeat;
      width: 14px;
      height: 14px;
      background-size: 14px 14px;
      transform: none;
      margin-right: 8px;
      padding: 0;

      svg {
        display: none;
      }
    }

    .el-tree-node__expand-icon.expanded {
      // 设置图标
      background-image: url('../assets/images/reduce.png');
      background-repeat: no-repeat;
      background-size: 14px 14px;
      width: 14px;
      height: 14px;
      transform: none;
    }

    .el-tree-node__expand-icon.is-leaf {
      // 叶节点去除前面图标
      display: none;
    }

    .el-tree-node:last-child>.el-tree-node__content::before {
      content: '';
      width: 1px;
      height: 10000px;
      // background-color: green;
      position: absolute;
      margin-left: -9px;
      bottom: 13px;
      border-left: 1px dotted #b8b9bb;
    }

    .el-tree-node__children .el-tree-node__content::after {
      content: '';
      width: 9px;
      height: 1px;
      // background-color: red;
      position: absolute;
      margin-left: -9px;
      border-top: 1px dotted #b8b9bb;
    }
  }
  
}
.default_form{
    .default_form_item{
      display: flex;
      align-items: center;
      height: 32px;
      margin-bottom: 18px;
      .label{
        box-sizing: border-box;
        width: 80px;
        padding-right: 12px;
        text-align: right;
      }
    }
  }
</style>
