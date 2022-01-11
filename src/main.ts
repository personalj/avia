import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from '@/plugins/i18n';
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import '@/assets/styles/main.scss'

Vue.config.productionTip = false;

Vue.use(VueToast);

import axios, { AxiosStatic } from 'axios';

Vue.prototype.$axios = axios;

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic;
  }
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
