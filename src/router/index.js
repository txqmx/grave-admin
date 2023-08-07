import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/layout/index.vue';
import store from '@/store';
import { ElMessage } from 'element-plus';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
    },
    redirect: '/grave',
    children: [
      {
        name: 'grave',
        path: '/grave',
        component: () => import('../views/grave/index.vue'),
      },
      {
        name: 'graveDetail',
        path: '/grave/detail',
        component: () => import('../views/grave/detail.vue'),
        meta:{
          backRoute: {name: 'grave'},
          activeMenu: '/grave'
        }
      },
      {
        name: 'member',
        path: '/member',
        component: () => import('../views/member/index.vue'),
      },
      {
        name: 'memberDetail',
        path: '/member/detail',
        component: () => import('../views/member/detail.vue'),
        meta:{
          backRoute: {name: 'member'},
          activeMenu: '/member'
        }
      },
      {
        name: 'page',
        path: '/page',
        component: () => import('../views/page/index.vue'),
      },
      {
        name: 'pageDetail',
        path: '/page/detail',
        component: () => import('../views/page/detail.vue'),
        meta:{
          backRoute: {name: 'page'},
          activeMenu: '/page'
        }
      },
      {
        name: 'pageTemplate',
        path: '/pageTemplate',
        component: () => import('../views/pageTemplate/index.vue'),
      },
      {
        name: 'pageTemplateDetail',
        path: '/pageTemplate/detail',
        component: () => import('../views/pageTemplate/detail.vue'),
        meta:{
          backRoute: {name: 'pageTemplate'},
          activeMenu: '/pageTemplate'
        }
      },
      {
        name: 'admin',
        path: '/admin',
        component: () => import('../views/admin/index.vue'),
      }
    ],
  },
  {
    name: 'graveMobile',
    path: '/graveMobile',
    component: () => import('../views/grave/graveMobile.vue'),
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
  store.commit('setBackRoute', '')
  let token = window.localStorage.getItem('token')
  let userInfo = window.localStorage.getItem('userInfo')
  let graveInfo = window.localStorage.getItem('graveInfo')
  let includeGrave = ['/member', '/member/detail', '/page', '/page/detail']
  if((!token || !userInfo) && to.path !== '/login'){
    ElMessage({
      message: '请登录',
      type: 'error',
      duration: 3 * 1000
    })
    next('/login');
  } else if(!graveInfo && includeGrave.includes(to.path)){
    ElMessage({
      message: '请选择',
      type: 'error',
      duration: 3 * 1000
    })
    if(window.isMobile){
      next('/graveMobile');
    } else {
      next('/grave');
    }
  } else{
    if(to.meta.backRoute){
      store.commit('setBackRoute', to.meta.backRoute)
    }
    next();
  }
  
});

export default router;
