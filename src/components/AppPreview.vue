<template>
  <el-dialog
    v-model="dialogVisible"
    title="预览"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  data(){
    return {
      dialogVisible:true,
      url:''
    }
  },
  props: {
    info: {
      default: () => {},
    },
  },
  methods: {
    edit() {
      this.$emit('edit', this.info);
    },
    handleDelete() {
      this.$emit('delete', this.info);
    },
  },
});
</script>

<style lang="scss" scoped>
.img-card-container {
  width: 200px;
  height: 200px;
  display: inline-block;
  margin-right: 30px;
  .img-content {
    width: 200px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-info {
  }
}
</style>
