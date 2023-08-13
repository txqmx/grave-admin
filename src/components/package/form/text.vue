<template>
  <div class="input_container">
    <el-input
      :style="{ width: '100%' }"
      v-model="inputVal"
      type="textarea"
      :autosize="autosize"
      :placeholder="placeholder"
      v-on:input="onInput"
      v-bind="$attrs"
    >
    </el-input>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TextEditor',
  inject: ['inputWidth'],
  props: {
    modelValue: {
      default: '',
    },
    placeholder: {
      default: '请输入',
    },
    autosize: {
      default: () => {
        return {
          minRows: 3,
          maxRows: 5,
        };
      },
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
});
</script>

<style lang="scss" scoped>
.input_container {
  display: block;
  max-width: 600px;
  width: 100%;
}
</style>
