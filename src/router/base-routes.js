import * as pageUrlConstants from '@/constant/page-url-constants';
export default [
  {
    name: pageUrlConstants.PAGE_URL_AMIS_EDIT,
    path: pageUrlConstants.PAGE_URL_AMIS_EDIT,
    code: 'amisEdit',
    component: () =>
      import(/* webpackChunkName:"amis-edit" */ '@/pages/amis/edit.vue'),
    meta: {
      title: 'AMIS编辑',
      isShow: true
    }
  },
  {
    name: pageUrlConstants.PAGE_URL_AMIS_PREVIEW,
    path: pageUrlConstants.PAGE_URL_AMIS_PREVIEW,
    code: 'amisPre',
    component: () =>
      import(/* webpackChunkName:"amis-pre" */ '@/pages/amis/preview.vue'),
    meta: {
      title: 'AMIS预览',
      isShow: false
    }
  }
];
