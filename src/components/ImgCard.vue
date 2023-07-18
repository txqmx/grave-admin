<template>
  <div class="img-card-container">
    <div class="img-content">
      <img :src="imgUrlParser(info.cover)" />
    </div>
    <div class="img-info">
      <div>{{ info.name }}</div>
      <div>{{ info.info }}</div>
    </div>
    <div class="img-btn">
      <el-button @click="edit">修改</el-button>
      <el-button @click="handleDelete">删除</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  data(){
    return {
      imgUrlParser:imgUrlParser
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
