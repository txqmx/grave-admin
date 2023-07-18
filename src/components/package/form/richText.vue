<template>
  <div class="editor-container">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, computed, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import api from '@/api';
import { ElMessage } from 'element-plus';
export default {
  name: 'RichEditor',
  components: { Editor, Toolbar },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = computed({
      get() {
        return props.modelValue || '';
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    const uploadImg = (file, insertFn) => {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'detail');
      api
        .upload(formData, {
          headers: {
            contentType: 'multipart/form-data', // 需要指定上传的方式
          },
        })
        .then((res) => {
          insertFn(res.fileUrl);
          ElMessage.success('上传成功');
        });
    };

    const toolbarConfig = {};
    const editorConfig = {
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          allowedFileTypes: ['image/*'],
          customUpload: uploadImg,
        },
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  },
};
</script>
<style lang="scss" scoped></style>
