<template>
    <div class="app-wrapper">
      <Sidebar></Sidebar>
      <div class="main-container">
        <Navbar>
          <template v-if="graveInfo" v-slot:title> 
            <span class="nav_msg">墓碑名称：{{graveInfo?.name}}</span>
            <span class="nav_msg">墓碑编码：{{graveInfo?.code}}</span>
          </template>
          <template v-slot:action>
          <div class="close">
            <el-icon @click="exit"><SwitchButton /></el-icon>
          </div>
        </template>
        </Navbar>
        <app-main></app-main>
      </div>
    </div>
</template>
<script lang="ts">
import Sidebar from './sidebar.vue';
import { computed, defineComponent, onMounted } from 'vue'
import { SwitchButton } from '@element-plus/icons-vue';
import Navbar from './navbar.vue';
import AppMain from './appMain.vue';
import { mapState,mapMutations } from 'vuex'
export default defineComponent({
    name: 'layout',
    components: { Sidebar, Navbar, AppMain,SwitchButton },
    computed:{
      ...mapState(['graveInfo'])
    },
    methods:{
      ...mapMutations(['setGraveInfo']),
      exit(){
        this.setGraveInfo('')
        this.$router.replace({
        name: 'grave'
      })
      }
    }


})
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
@import '../../assets/style/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .main-container{
    transition: margin-left 0.28s;
    padding-left: 150px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    .main-header{
      height: 50px;
    }
    .nav_msg{
      font-size: 16px;
      color: #606266;
      margin-right: 30px;
    }
    .close {
      display: flex;
      cursor: pointer;
      margin-left: 20px;
      font-size: 16px;
    }
  }
}
</style>