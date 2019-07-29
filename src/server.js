require('source-map-support').install();

import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import VueMeta from 'vue-meta';
import { cloneDeep } from 'lodash-es';
import App from './App';
import { storeFactory } from './store/store';
import routers from './router/routers';
import './global.sass';

Vue.use(VueMeta);

const renderer = createRenderer();

function server(url, context = {}, initialState = {}) {
  const cloneData = cloneDeep(initialState);

  /* app */
  const app = new Vue({
    store: storeFactory(cloneData),
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