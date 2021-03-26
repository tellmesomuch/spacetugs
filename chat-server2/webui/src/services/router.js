  
import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '../components/LoginPage.vue'
import Chat from '../components/chat/Chat.vue'
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/', component: Chat,props: true },
    { path: '/login', component: LoginPage },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  //const publicPages = ['/login'];
  //const authRequired = !publicPages.includes(to.path);
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = JSON.parse(localStorage.getItem('spacetugsuser'));
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})