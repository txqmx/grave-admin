import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/layout/index.vue';
import graveLayout from '../components/layout/graveLayout.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
    },
    redirect: '/member',
    children: [
      {
        name: 'member',
        path: '/member',
        component: () => import('../views/member/index.vue'),
      }
    ],
  },
  {
    name: 'grave',
    path: '/grave',
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
      },
      {
        name: 'graveDetail',
        path: '/grave/detail',
        component: () => import('../views/grave/detail.vue'),
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
    next('/login');
  } else if((!userInfo || !graveInfo) && to.path !== '/grave' && to.path !== '/grave/detail' && to.path !== '/login'){
    next('/grave');
  } else{
    next();
  }
  
});

export default router;
