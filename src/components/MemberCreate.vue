<template>
  <el-dialog :title="dialogTitle" v-model="showModal">
    <span class="baseMsg" v-if="type === 'child'">父亲：{{ data.name }} </span>
    <span class="baseMsg" v-if="type === 'mate'">配偶：{{ data.name }} </span>
    <el-form ref="memberRef" :inline="true" :model="memberForm" :rules="rules">
      <el-form-item label="名字" prop="name">
        <el-input v-model="memberForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="身份" prop="identity">
        <el-input v-model="memberForm.identity" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="memberForm.sex">
          <el-option :value="0" label="男"></el-option>
          <el-option :value="1" label="女"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(memberRef)"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import api from '../api';
import { defineComponent, onMounted, reactive, computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'MemberCreate',
  props: {
    type: {
      default: 'root',
    },
    data: {
      default: () => {},
    },
  },
  setup(props, context) {
    const store = useStore();
    // 弹框显示对象
    const showModal = ref(true);
    // title
    let dialogTitle = computed(() => {
      let title = '添加根节点';
      if (props.type === 'child') {
        title = '添加孩子';
      } else if (props.type === 'mate') {
        title = '添加配偶';
      }
      return title;
    });
    // 表单
    let memberForm = reactive({
      addType: props.type,
      name: '',
      identity: '',
      sex: 0,
      avatar: '',
      genealogyId: store.getters.familyId,
    });
    // 表单ref
    const memberRef = ref(null);
    // 表单验证
    const rules = reactive({
      name: [{ required: true, trigger: 'blur' }],
      identity: [{ required: true, trigger: 'blur' }],
      sex: [{ required: true, trigger: 'blur' }],
    });
    // 关闭
    const handleClose = async () => {
      context.emit('close');
    };
    // 提交
    const handleSubmit = async (formEl) => {
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          await api.addMember(memberForm);
          ElMessage({
            message: '新增成功',
            type: 'success',
          });
          context.emit('submit');
        }
      });
    };
    onMounted(() => {
      if (props.type === 'mate') {
        Object.assign(memberForm, {
          mateId: props.data.id,
          sex: props.data.sex === 0 ? 1 : 0,
        });
      } else if (props.type === 'child') {
        Object.assign(memberForm, {
          parentId: props.data.id,
        });
      } else {
        Object.assign(memberForm, {
          parentId: -1,
        });
      }
    });
    return {
      showModal,
      dialogTitle,
      memberForm,
      memberRef,
      rules,
      handleClose,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss">
// .user-manage{

// }
.baseMsg{
  display: inline-block;
  margin-bottom: 20px;
  margin-left: 10px;
}
</style>
