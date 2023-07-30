<template>
  <div class="mc-input_container">
    <el-radio-group v-model="inputVal" v-bind="$attrs">
      <el-radio :label="1">是</el-radio>
      <el-radio :label="0">否</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'RadioEditor',
  inject: ['inputWidth'],
  props: {
    modelValue: {
      default: '',
    }
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
