<template>
  <div class="mc-input_container">
    <el-select
      :style="{ width: inputWidth }"
      v-model="inputVal"
      :placeholder="placeholder"
      v-bind="$attrs"
    >
      <el-option
        v-for="item in options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SelectEditor',
  inject: ['inputWidth'],
  props: {
    modelValue: {
      default: '',
    },
    placeholder: {
      default: '请选择',
    },
    labelKey: {
      default: 'label',
    },
    valueKey: {
      default: 'value',
    },
    options: {
      type: Array,
      default() {
        return [];
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

<style lang="scss" scoped></style>
