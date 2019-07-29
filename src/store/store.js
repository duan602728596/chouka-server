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

  return store.store;
}

export default store;