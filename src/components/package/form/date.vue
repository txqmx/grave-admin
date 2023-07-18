<template>
  <div class="mc-input_container">
    <el-date-picker
      :style="{ width: inputWidth }"
      v-model="inputVal"
      type="date"
      :placeholder="placeholder"
      v-on:input="onInput"
      v-bind="$attrs"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DateEditor',
  inject: ['inputWidth'],
  props: {
    modelValue: {
      default: '',
    },
    placeholder: {
      default: '请选择',
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
