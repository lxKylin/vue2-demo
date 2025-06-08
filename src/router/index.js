import Vue from 'vue';
import Router from 'vue-router';
import { PAGE_URL_OVERVIEW } from '@/constant/page-url-constants';

import baseRoutes from './base-routes';

Vue.use(Router);

export const routes = [
  {
    path: PAGE_URL_OVERVIEW,
    name: PAGE_URL_OVERVIEW,
    meta: {
      title: '概览',
      isShow: true
    },
    component: () => import('@/pages/overview.vue')
  },
  ...baseRoutes
];

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: PAGE_URL_OVERVIEW
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
