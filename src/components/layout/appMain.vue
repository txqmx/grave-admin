<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
export default defineComponent({
    name: 'appMain'
})
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100% - 90px);
  position: relative;
  overflow: auto;
//   background: #ffffff;
  padding: 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>