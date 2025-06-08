import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/cover.less';
import '@/assets/css/common.less';

import router from './router';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
});
