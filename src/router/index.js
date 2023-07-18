import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/layout/index.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
    },
    redirect: '/genealogy',
    children: [
      {
        name: 'Genealogy',
        path: '/genealogy',
        component: () => import('../views/genealogy/index.vue'),
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

const query = { family: 'huanglf' }; //这是全局需携带的参数

router.beforeEach((to, from, next) => {
  if (to.query.family) {
    next();
    return;
  }
  if (from.query.family) {
    let toQuery = JSON.parse(JSON.stringify(to.query));
    toQuery.family = from.query.family;
    next({
      path: to.path,
      query: toQuery,
    });
  } else {
    next();
  }
});

export default router;
