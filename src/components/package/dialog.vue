<template>
  <el-dialog :title="title" v-model="showModal" :append-to-body="true">
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  name: 'DialogContainer',
  data(){
    return {
      showModal: true
    }
  },
  props: {
    title: {
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('submit');
    },
  },
});
</script>

<style lang="scss" scoped></style>
