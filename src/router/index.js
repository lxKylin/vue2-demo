import Vue from 'vue';
import Router from 'vue-router';
import { PAGE_URL_OVERVIEW } from '@/constant/page-url-constants';

Vue.use(Router);

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
      children: [
        {
          path: PAGE_URL_OVERVIEW,
          name: PAGE_URL_OVERVIEW,
          component: () => import('@/pages/overview.vue')
        }
      ]
    }
  ]
});

export default router;
