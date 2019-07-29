import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';
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

routers.beforeResolve(function(to, from, next) {
  const { matched } = to;

  for (const item of matched) {
    const actions = item?.components?.default?.options?.actions;

    if (actions) {
      store.injectModule(actions);
    }
  }

  next();
});

export default routers;