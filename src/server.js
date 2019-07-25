require('source-map-support').install();

import Vue from 'vue';
import { Helmet, HelmetProvider } from '@jnields/vue-helmet';
import { createRenderer } from 'vue-server-renderer';
import App from './App';
import { storeFactory } from './store/store';
import routers from './router/routers';
import './global.sass';

Vue.component('helmet', Helmet);
Vue.component('helmet-provider', HelmetProvider);

const renderer = createRenderer();

function server(url, context = {}, initialState = {}) {
  const copy = JSON.parse(JSON.stringify(initialState));

  /* app */
  const app = new Vue({
    store: storeFactory(copy),
    router: routers,
    render() {
      return <App />;
    }
  });

  routers.push('_path' in context ? context._path : context.path);

  return new Promise((resolve, reject) => {
    routers.onReady(() => {
      resolve(renderer.renderToStream(app));
    });
  });
}

export default server;