<template>
  <div class="sidebar-container">
    <div class="logo">
      <span>{{graveInfo.name}}</span>
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
        <el-menu-item index="/member">
          <template #title>人员关系</template>
        </el-menu-item>
        <el-menu-item index="/page">
          <template #title>页面配置</template>
        </el-menu-item>
        <el-menu-item index="/article">
          <template #title>文章管理</template>
        </el-menu-item>
        <el-menu-item index="/photo">
          <template #title>相册管理</template>
        </el-menu-item>
        <el-menu-item index="/media">
          <template #title>音视频</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { mapState } from 'vuex'
export default defineComponent({
  name: 'sidevar',
  created() {
    this.activeIndex = this.$route.path;
  },
  computed:{
    ...mapState(['graveInfo'])
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
