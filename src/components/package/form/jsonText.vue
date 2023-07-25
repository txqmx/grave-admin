<template>
  <div class="json-container">
    <codemirror v-model:value="inputVal" :options="options" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Codemirror from 'codemirror-editor-vue3';

// 编辑器代码格式
import 'codemirror/mode/javascript/javascript.js';
// 自动刷新(防止codemirror需要手动刷新才出数据)
import 'codemirror/addon/display/autorefresh';
// 主题
import 'codemirror/theme/solarized.css'

import 'codemirror/addon/lint/json-lint'

export default defineComponent({
  name: 'JsonEditor',
  components: { Codemirror },
  data() {
    return {
      jsonEditor: null,
      options: {
        autorefresh: true,
        tabSize: 2,
        lint: true,
        autoFormatOnLoad: true, // 启用自动格式化
        selfContain: true,
        mode: 'application/json',
        theme: 'solarized',
        lineNumbers: true,
        autoCloseBrackets: true, //自动关闭方括号和引号
        viewportMargin: Infinity, //处理高度自适应时搭配使用
        smartIndent: true, // 自动缩进是否开启
        highlightDifferences: true,
        autofocus: false,
        indentUnit: 2,
        matchBrackets: true, // 光标匹配括号
        // readOnly: true, // 只读
        showCursorWhenSelecting: true,
        firstLineNumber: 1,
        gutters: ['CodeMirror-lint-markers'],
      },
    };
  },
  props: {
    modelValue: {
      default: '',
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.json-container {
  width: 100%;
  height: 100%;
  position: relative;

  :deep(.CodeMirror) {
    // height: auto;
    height: 420px;

    .CodeMirror-code {
      text-align: left;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #f08047;
    }
  }
}
</style>
