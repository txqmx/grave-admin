<template>
  <div class="sidebar-container">
    <div class="logo">
      <span>管理系统</span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        router
      >
        <el-menu-item index="/genealogy">
          <template #title>家谱管理</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'sidevar',
  created() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      showLogo: true,
      isCollapse: false,
      activeIndex: '/genealogy',
    };
  },
});
</script>
<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  width: 150px;
  height: 100vh;
  background-color: #001529;
  overflow-y: auto;
  transition: width 0.3s;
  overflow: hidden;
  .el-scrollbar {
    // height: 100%;
    height: calc(100% - 50px);
  }
  .logo {
    display: flex;
    align-items: center;
    // justify-content: center;
    font-size: 18px;
    padding: 0 20px;
    height: 50px;
    color: #ffffff;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 151px;
  min-height: 400px;
  text-align: left;
}
</style>
