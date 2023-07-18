<template>
  <div class="family-create-container">
    <div class="create-root">
      <el-button :disabled="!!familyTreeData.length" @click="addMember('root', currentRow)">增加父节点</el-button>
      <el-button :disabled="!currentRow.id" @click="addMember('child', currentRow)">添加后代</el-button>
      <el-button :disabled="!currentRow.id || currentRow.mateInfo" @click="addMember('mate', currentRow)">添加配偶
      </el-button>
      <el-button :disabled="!currentRow.id" @click="remove(currentRow)">删除</el-button>
    </div>
    <div class="family-content">
      <el-tree class="tree" :data="familyTreeData" node-key="id" default-expand-all :expand-on-click-node="false"
        @node-click="treeNodeClick">
        <template #default="{ data }">
          <span class="custom-tree-node">
            <span class="node-name">
              {{ data.name }}
              <el-icon @click="nodeClick(data)"><Edit /></el-icon>
            </span>
            <span v-if="data.mateInfo" class="node-name">
            {{data.mateInfo && data.mateInfo.name}}
            <el-icon @click="nodeClick(data.mateInfo)"><Edit /></el-icon>
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
    <MemberCreate v-if="showModal" :type="addType" :data="addBaseData" @submit="submit" @close="close"></MemberCreate>
  </div>
</template>

<script>
import api from '../api';
import { getCurrentInstance, onActivated, reactive, ref, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { Edit } from '@element-plus/icons-vue';
import MemberForm from '../components/MemberForm.vue';
import MemberCreate from '../components/MemberCreate.vue';
export default {
  name: 'TreeCreate',
  components: { MemberForm, MemberCreate,Edit },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    // 获取Composition API 上下文对象
    const { ctx } = getCurrentInstance();
    // 族谱树
    const familyTreeData = ref([]);
    // 当前选中节点
    let currentRow = ref({});
    // 弹框显示对象
    const showModal = ref(false);
    // 定义用户操作行为
    let addType = ref('root');
    // 新增对象
    let addBaseData = ref('');
    // 获取族谱树
    const getTreeData = async () => {
      const root = await api.getMemberList({
        parentId: -1,
      });
      if (root.length) {
        const res = await api.getMemberTree({ id: root[0].id });
        familyTreeData.value = [res];
      } else {
        familyTreeData.value = [];
      }
    };
    // 点击节点
    const nodeClick = async (row, node) => {
      router.push({
        path: '/TreeDetail',
        query: {
          id: row.id,
        },
      });
      // const res = await api.getMemberItem({
      //   id: row.id,
      //   child: true,
      //   mate: true,
      // });
      // currentRow.value = res;
    };
    const treeNodeClick = async (row, node) => {
      currentRow.value = row;
    };
    // 添加成员
    const addMember = async (type, row) => {
      if(type !== 'root') {
        if (!currentRow.value.id) {
        ElMessage({
          message: '请选择节点',
          type: 'error',
        });
        return;
      }
      }
      if (type === 'mate') {
        if (currentRow.value.mateInfo) {
          ElMessage({
            message: '已存在配偶',
            type: 'error',
          });
          return;
        }
      }
      addBaseData.value = row;
      addType.value = type;
      showModal.value = true;
    };

    const close = async () => {
      showModal.value = false;
    };
    const submit = async () => {
      getTreeData();
      close();
    };
    const remove = async (row) => {
      if (!currentRow.value.id) {
        ElMessage({
          message: '请选择节点',
          type: 'error',
        });
        return;
      }
      await api.deleteMember({
        id: row.id,
      });
      getTreeData();
    };

    getTreeData();
    return {
      familyTreeData,
      currentRow,
      showModal,
      addType,
      addBaseData,
      nodeClick,
      treeNodeClick,
      addMember,
      submit,
      close,
      remove,
      getTreeData,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((e) => {
      e.currentRow ={}
      if (to.params.reload) {
        e.getTreeData();
      }
    });
  },
};
</script>

<style lang="scss">
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
      i{
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
        background-image: url("../assets/images/add.png");
        background-repeat: no-repeat;
        width: 14px;
        height: 14px;
        background-size: 14px 14px;
        transform: none;
        margin-right: 8px;
        padding: 0;
        svg{
          display:none
        }
      }
      .el-tree-node__expand-icon.expanded {
        // 设置图标
        background-image: url("../assets/images/reduce.png");
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

    .el-tree-node:last-child > .el-tree-node__content::before {
      content: "";
      width: 1px;
      height: 10000px;
      // background-color: green;
      position: absolute;
      margin-left: -9px;
      bottom: 13px;
      border-left: 1px dotted #b8b9bb;
    }

    .el-tree-node__children .el-tree-node__content::after {
      content: "";
      width: 9px;
      height: 1px;
      // background-color: red;
      position: absolute;
      margin-left: -9px;
      border-top: 1px dotted #b8b9bb;
    }

  }
}
</style>
