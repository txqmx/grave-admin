<template>
  <div class="mc-input_container">
    <el-input
      :style="{ width: inputWidth }"
      v-model="inputVal"
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
  name: 'InputEditor',
  inject: ['inputWidth'],
  props: {
    modelValue: {
      default: '',
    },
    placeholder: {
      default: '请输入',
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

<style lang="scss" scoped></style>
