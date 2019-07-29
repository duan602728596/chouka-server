import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../modules/Index/Layout';

Vue.use(VueRouter);

const ResultBundle = () => import(/* webpackChunkName: 'result' */ '../modules/Result/Layout');

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
    }
  ]
});

export default routers;