import Vue from "vue";
import Router from "vue-router";
// import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('@/components/Login/index')
    },
    {
      path: '/',
      redirect: '/login',
      hidden: true,
      component: () => import('@/components/Login/index')
    },
    {
      path: '/admin',
      name: '管理系统',
      hidden: true,
      component: () => import('@/components/Home/index')
    },
    {
      path: '/admin',
      name: '管理',
      redirect: '/admin/rss',
      iconClass: 'fa fa-tachometer',
      component: () => import('@/components/Home/index'),
      children: [
        {
          path: '/admin/rss',
          iconClass: 'fa fa-list',
          name: 'rss管理',
          component: () => import('@/components/Home/rss/index')
        },
        {
          path: '/admin/push-detail',
          iconClass: 'fa fa-align-left',
          name: 'push管理',
          component: () => import('@/components/Home/push/index')
        },
          ]
    },
  ],
  mode: 'history'
})




