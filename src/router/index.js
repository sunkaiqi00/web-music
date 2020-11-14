import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
    redirect: '/home/recommend',
    children: [
      {
        path: 'recommend',
        component: () => import('@/components/recommend/recommend'),
        meta: {}
      },
      {
        path: 'singer',
        component: () => import('@/components/singer/singer'),
        meta: {}
      },
      {
        path: 'rank',
        component: () => import('@/components/rank/rank'),
        meta: {}
      },
      {
        path: 'profile',
        component: () => import('@/components/profile/profile'),
        meta: {}
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/components/search/search'),
    meta: {}
  },
  {
    path: '/singer/detail',
    component: () => import('@/components/singer/SingerDetail')
  },
  {
    path: '/recommend/popular',
    component: () => import('@/components/recommend/PopularSongs')
  },
  {
    path: '/rank/toplist',
    component: () => import('@/components/rank/TopList')
  }
];

const router = new VueRouter({
  routes
});

export default router;
