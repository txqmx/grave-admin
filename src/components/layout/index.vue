<template>
    <div v-if="userInfo" class="app-wrapper">
      <Sidebar></Sidebar>
      <div class="main-container">
        <Navbar></Navbar>
        <app-main></app-main>
      </div>
    </div>
</template>
<script lang="ts">
import Sidebar from './sidebar.vue';
import { computed, defineComponent, onMounted } from 'vue'
import Navbar from './navbar.vue';
import AppMain from './appMain.vue';
import { mapState,mapActions } from 'vuex'
export default defineComponent({
    name: 'layout',
    components: { Sidebar, Navbar, AppMain },
    async created(){
      await this.getUserInfo()
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      ...mapActions(['getUserInfo']),
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
  }
}
</style>