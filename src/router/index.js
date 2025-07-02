import Vue from 'vue';
import Router from 'vue-router';
import { PAGE_URL_MONACO_DEMO } from '@/constant/page-url-constants';

import baseRoutes from './base-routes';

Vue.use(Router);

export const routes = [
  {
    path: PAGE_URL_MONACO_DEMO,
    name: PAGE_URL_MONACO_DEMO,
    meta: {
      title: '编辑器',
      isShow: true
    },
    component: () => import('@/pages/monaco-demo.vue')
  },
  ...baseRoutes
];

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: PAGE_URL_MONACO_DEMO
    },
    {
      path: '/layout',
      name: '/layout',
      component: () => import('@/pages/layout.vue'),
      children: routes
    }
  ]
});

router.afterEach((to) => {
  // 修改当前标签页的名称
  const title = to.meta.title;
  const titleNode = document.querySelector('head > title');
  if (title && titleNode) {
    titleNode.textContent = title;
  }
});

export default router;
