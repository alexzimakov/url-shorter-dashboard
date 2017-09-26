import Vue from 'vue';
import Router from 'vue-router';
import { requireGuest } from '@/utils/auth';
import Home from '@/components/Home';
import Register from '@/components/Register';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: requireGuest,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: requireGuest,
    },
  ],
});
