import { MutationTree } from 'vuex';
import { AccountState, User } from './types';

export const mutations: MutationTree<AccountState> = {
  loginRequest(state, user: User) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user: User) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = undefined;
  },
  logout(state) {
    state.status = {};
    state.user = undefined;
  },
  registerRequest(state, user: User) {
    state.status = { registering: true };
  },
  registerSuccess(state, user: User) {
    state.status = {};
  },
  registerFailure(state, error) {
    state.status = {};
  }

};
