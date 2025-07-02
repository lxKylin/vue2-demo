import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.less';

import router from './router';

import ReactProxy from '@/components/react-proxy.vue';
import QzTips from '@/components/qz-tips.vue';

Vue.use(ElementUI);

Vue.component('ReactProxy', ReactProxy);
Vue.component('QzTips', QzTips);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
});
