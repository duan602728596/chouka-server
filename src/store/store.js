import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import formatModules from './formatModules';

Vue.use(Vuex);

const store = {
  store: null,
  asyncModules: {}
};

export function storeFactory(initialState = {}) {
  /* store */
  store.store = new Vuex.Store({
    state: initialState,
    modules: formatModules(modules, initialState)
  });

  // 异步注入reducer
  store.injectModule = function(actions) {
    for (const key in actions) {
      if (!(key in store.asyncModules)) {
        const data = initialState[key];

        // 注入initialState
        if (data) {
          actions[key].state = Object.assign(actions[key].state || {}, data || {});
        }

        store.store.registerModule(key, actions[key]);
        store.asyncModules[key] = actions[key];
      }
    }
  };

  return store.store;
}

export default store;