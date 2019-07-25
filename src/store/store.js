import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import formatModules from './formatModules';

Vue.use(Vuex);

const store = {};

export function storeFactory(initialState = {}) {
  /* store */
  Object.assign(store, new Vuex.Store({
    state: initialState,
    modules: formatModules(modules)
  }));

  return store;
}

export default store;