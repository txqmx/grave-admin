<template>
  <div class="sidebar-container">
    <div class="logo">
      <span>铭志码管理系统</span>
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
        <el-menu-item index="/grave">
          <template #title>墓碑管理</template>
        </el-menu-item>
        <el-menu-item v-if="graveInfo.id" index="/member">
          <template #title>人物关系</template>
        </el-menu-item>
        <el-menu-item v-if="graveInfo.id" index="/page">
          <template #title>页面配置</template>
        </el-menu-item>
        <el-menu-item v-if="userInfo.root" index="/pageTemplate">
          <template #title>页面模板</template>
        </el-menu-item>
        <el-menu-item v-if="userInfo.root" index="/admin">
          <template #title>管理员设置</template>
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
  data() {
    return {
      showLogo: true,
      isCollapse: false,
    };
  },
  computed:{
    ...mapState(['graveInfo', 'userInfo']),
    activeIndex(){
      return this.$route?.meta?.activeMenu || this.$route.path
    }
  },
});
</script>
<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  width: 170px;
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
  width: 171px;
  min-height: 400px;
  text-align: left;
}
</style>
