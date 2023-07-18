<template>
  <div class="member-container">
    <div class="member-content member-self">
      <div class="top-title">个人信息</div>
      <el-form
        ref="memberFormRef"
        :inline="true"
        label-width="80px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-input v-model="formData.identity" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex">
            <el-option :value="0" label="男"></el-option>
            <el-option :value="1" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生年">
          <el-date-picker
            v-model="formData.birthDate"
            type="date"
            placeholder="请选择日期"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="卒年">
          <el-date-picker
            v-model="formData.dieDate"
            type="date"
            placeholder="请选择日期"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="层级">
          <el-input
            v-model="formData.level"
            placeholder="请输入"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="族谱">
          <el-input
            v-model="formData.genealogyId"
            placeholder="请输入"
            disabled
          ></el-input>
        </el-form-item>
        <div>
          <el-form-item label="头像">
            <!-- <UploadImg
              v-model="formData.avatar"
              :rootPath="formData.rootPath"
            ></UploadImg> -->
            <FileUploadEditor 
            v-model="formData.avatar"
            type="img"
            folder="avatar"
            :corpperScale='[224, 288]'
            >

            </FileUploadEditor>
          </el-form-item>
        </div>
        <div class="form-item-text">
          <el-form-item label="简介">
            <el-input
              v-model="formData.info"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-item-text">
          <el-form-item label="详情">
            <rich-editor
              v-if="detailShow"
              v-model="formData.detail"
            ></rich-editor>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="member-content member-mate">
      <div class="top-title">配偶信息</div>
      <div>{{ formData.mateInfo && formData.mateInfo.name }}</div>
    </div>
    <div class="member-content member-children">
      <div class="top-title">孩子信息</div>
      <Draggable
        v-model="formData.children"
        :list="formData.children"
        item-key="id"
        forceFallback="true"
      >
        <template #item="{ element, index }">
          <div class="child-item">{{ index + 1 }}、{{ element.name }}</div>
        </template>
      </Draggable>
    </div>
    <div>
      <el-button type="primary" @click="handleSubmit(memberFormRef)"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  computed,
  watch,
  ref,
  toRaw,
  toRefs,
  nextTick,
} from 'vue';
import Draggable from 'vuedraggable';
import { ElMessage } from 'element-plus';
import api from '../api';
// import UploadImg from './Cropper/uploadImg.vue';
import RichEditor from './Editor/richEditor.vue';
export default defineComponent({
  name: 'MemberForm',
  props: ['modelValue', 'form'],
  emits: ['update:modelValue', 'handleQuery'],
  components: { Draggable, RichEditor },
  setup(props, context) {
    const formData = reactive({});
    // 表单ref
    const memberFormRef = ref(null);
    // 表单验证
    const rules = reactive({
      name: [{ required: true, trigger: 'blur' }],
      identity: [{ required: true, trigger: 'blur' }],
      sex: [{ required: true, trigger: 'blur' }],
    });
    const handleSubmit = async (formEl) => {
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          let childIds = formData.children
            .reduce((v, t) => {
              return v + t.id + ',';
            }, '')
            .replace(/^,|,$/, '');
          formData.childIds = childIds;
          await api.updateMember(formData);
          ElMessage({
            message: '修改成功',
            type: 'success',
          });

          context.emit('submit');
        }
      });
    };
    const detailShow = ref(false);
    watch(
      () => props.modelValue,
      (newValue) => {
        detailShow.value = false;
        nextTick(() => {
          Object.assign(formData, newValue);
          console.log(formData);
          detailShow.value = true;
        });
      },
      { deep: true }
    );
    return {
      formData,
      rules,
      memberFormRef,
      detailShow,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss">
.member-container {
  background: #ffffff;
  padding: 0 10px 10px;
  .el-form-item__content {
    width: 200px;
    .el-select {
      width: 100%;
    }
  }
  .form-item-text {
    .el-form-item__content {
      width: 700px;
    }
  }

  .member-content {
    margin-bottom: 10px;
  }

  .top-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 -10px;
    background: #f5f5f5;
    height: 38px;
    // line-height: 30px;
    font-size: 16px;
    padding: 5px 10px;
    margin-bottom: 10px;
  }

  .child-item {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #d5d5d5;
    margin: 5px 0;
  }
}
</style>
