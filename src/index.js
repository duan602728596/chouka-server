import Vue from 'vue';
import { Helmet, HelmetProvider } from '@jnields/vue-helmet';
import App from './App';
import { storeFactory } from './store/store';
import routers from './router/routers';
import './global.sass';

Vue.component('helmet', Helmet);
Vue.component('helmet-provider', HelmetProvider);

/* app */
const index = new Vue({
  el: '#app',
  store: storeFactory(window.__INITIAL_STATE__ || {}),
  router: routers,
  render() {
    return <App />;
  }
});

if (module.hot) {
  module.hot.accept();
}