<template>
  <div class="mc-input_container">
    <el-input
      :style="{ width: inputWidth }"
      v-model="inputVal"
      :placeholder="placeholder"
      v-on:input="onInput"
      v-bind="systemModel ? {...$attrs, disabled:true}: $attrs"
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
    systemModel:{
      default: false
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
