<template>
  <div class="navbar">
    <div v-show="backRoute" class="nav-left" @click="goBack">
      <div class="nav-icon">
        <el-icon><Back /></el-icon>
      </div>
      <div class="nav-title">返回</div>
    </div>

    <div>
      <slot name="title"></slot>
    </div>

    <div class="nav-right">
      <el-dropdown :hide-on-click="false">
        <div class="admin_set">
          {{ userInfo.name || userInfo.user_name}}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <slot name="action"></slot>
      
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { Back,ArrowDown } from '@element-plus/icons-vue';
import { mapState, mapMutations } from 'vuex';
export default defineComponent({
  name: 'navbar',
  components: { Back, ArrowDown },
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState(['backRoute','userInfo']),
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setGraveInfo']),
    goBack() {
      this.$router.push(this.backRoute);
    },
    logout(){
      this.setUserInfo('')
      this.setGraveInfo('')
      window.localStorage.removeItem('token')
      this.$router.replace({
        name: 'login'
      })
    }
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  .nav-left {
    display: flex;
    cursor: pointer;
    margin-right: 40px;
    position: relative;
    .nav-icon {
      font-size: 18px;
      margin-right: 6px;
      display: flex;
      align-items: center;
    }
    .nav-title {
      font-size: 14px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 16px;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      background: #dcdfd6;
    }
  }
  .nav-right{
    display: flex;
    align-items: center;
    .admin_set{
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 16px;
    }
    .close{
      display: flex;
      cursor: pointer;
      margin-left: 20px;
      font-size: 16px;
    }
  }
}
</style>
