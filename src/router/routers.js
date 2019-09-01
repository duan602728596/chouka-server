import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../pages/Index/Layout';

Vue.use(VueRouter);

const ResultBundle = () => import(/* webpackChunkName: 'result' */ '../pages/Result/Layout');
const Page404BBundle = () => import(/* webpackChunkName: 'page_404' */ '../pages/Page404/Layout');

const routers = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      component: Index
    },
    {
      path: '/Index',
      name: 'index',
      component: Index
    },
    {
      path: '/Result',
      name: 'result',
      component: ResultBundle
    },
    {
      path: '*',
      name: 'page_404',
      component: Page404BBundle
    }
  ]
});

export default routers;