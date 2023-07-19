<template>
  <div class="navbar">
    <div v-show="backRoute" class="nav-left" @click="goBack">
      <div class="nav-icon">
        <el-icon><Back /></el-icon>
      </div>
      <div class="nav-title">返回</div>
    </div>
    
    <div>
      <slot></slot>
    </div>
    
    <div >
      {{userInfo.name || userInfo.user_name}}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { Back } from '@element-plus/icons-vue';
import { mapState } from 'vuex'
export default defineComponent({
  name: 'navbar',
  components: { Back },
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState(['userInfo']),
    backRoute() {
      return this.$store.state.backRoute;
    }
  },
  watch: {
    $route(to, from) {
      this.$store.commit('setBackRoute', '');
    },
  },
  methods: {
    goBack() {
      this.$router.push(this.backRoute);
      // {
      //   name: this.backRoute,
      //   params: {
      //     reload: true,
      //   },
      // }
    },
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
}
</style>
