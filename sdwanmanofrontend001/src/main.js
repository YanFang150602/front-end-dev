import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/utils/axios';
import Antd from 'ant-design-vue';
import VueI18n from 'vue-i18n';

import 'ant-design-vue/dist/antd.css';

// 引入样式
import 'vue-easytable/libs/themes-base/index.css';

// 导入 table 和 分页组件
import { VTable, VPagination } from 'vue-easytable';

// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

import { axiosBaseUrl } from '@/config/index';
import CustomComponents from 'components/common/index';

// poc加载
if (process.env.VUE_APP_BUILD_MODE !== 'devops') {
  import('web-gly-plugin/packages').then(({ default: component }) => {
    Vue.use(component);
  });
}

// 注册i18n
Vue.use(VueI18n);
// 注册http请求
Vue.use(axios);
// 注册ui组件
Vue.use(Antd);
// 注册全局组件
Vue.use(CustomComponents);

// 将构建环境挂载到全局 development production devops(移动) poc(浪潮)
Object.defineProperty(Vue.prototype, '$env', {
  value: process.env.VUE_APP_BUILD_MODE
});
// 挂载全局上传uploadUrl 上传时会用到
Object.defineProperty(Vue.prototype, '$uploadUrl', {
  value: axiosBaseUrl.uploadUrl
});
// 挂载全局事件总线 切记在组件销毁阶段取消事件监听
Object.defineProperty(Vue.prototype, '$EventBus', { value: new Vue() });

Vue.config.productionTip = false;

const messages = {
  zh: require('@/assets/lang/zh.js'),
  en: require('@/assets/lang/en.js')
};

const i18n = new VueI18n({
  locale: 'en', // 设置默认语言标示
  messages
});

// 将根组件实例挂载到$vm上，可在访问不到组件实例时，通过window属性进行访问
window.$vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
