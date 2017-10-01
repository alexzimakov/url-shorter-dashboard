// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import 'element-ui/lib/theme-default/index.css';
import env from './env';
import App from './App';
import filters from './filters';
import store from './store';
import router from './router';
import './font-awesome-icons.less';

Vue.config.productionTip = false;

// Setting vue resource plugin.
Vue.use(VueResource);
Vue.http.options.root = env.serverHost;

// Setting elemet ui.
Vue.use(ElementUI, { locale });

// Setting custom filters.
Object.entries(filters).forEach(([name, filter]) => {
  Vue.filter(name, filter);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
