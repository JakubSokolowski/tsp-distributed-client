import Vue from 'vue';
import * as Vuex from 'vuex';
import { alert } from './alert';
import { users } from './user';
import { account } from './account';

Vue.use(Vuex);

export const createStore = () => new Vuex.Store({
  modules: {
    alert,
    users,
    account
  }
});
