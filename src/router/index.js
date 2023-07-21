import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/layout/index.vue';
import graveLayout from '../components/layout/graveLayout.vue';
import { ElMessage } from 'element-plus';

const routes = [
  {
    name: 'home',
    path: '/home',
    component: Layout,
    meta: {
      title: '首页',
    },
    redirect: '/grave/detail',
    children: [
      {
        name: 'graveDetail',
        path: '/grave/detail',
        component: () => import('../views/grave/detail.vue'),
      },
      {
        name: 'member',
        path: '/member',
        component: () => import('../views/member/index.vue'),
      }
    ],
  },
  {
    name: 'grave',
    path: '/',
    component: graveLayout,
    meta: {
      title: '墓碑管理',
    },
    redirect: '/grave',
    children: [
      {
        name: 'graveIndex',
        path: '/grave',
        component: () => import('../views/grave/index.vue'),
      }
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('../views/login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  let userInfo = window.localStorage.getItem('userInfo')
  let graveInfo = window.localStorage.getItem('graveInfo')
  if(!token && to.path !== '/login'){
    ElMessage({
      message: '请登录',
      type: 'error',
      duration: 3 * 1000
    })
    next('/login');
  } else if((!userInfo || !graveInfo) && to.path !== '/grave'  && to.path !== '/login'){
    ElMessage({
      message: '请选择',
      type: 'error',
      duration: 3 * 1000
    })
    next('/grave');
  } else{
    next();
  }
  
});

export default router;
