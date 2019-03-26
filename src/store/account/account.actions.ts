import { ActionTree } from 'vuex';
import { AccountState } from './types';
import { userService } from '../../services';
import router from '../../router';
import { RootState } from '../types';

export const actions: ActionTree<AccountState, RootState> = {
  login({ dispatch, commit }, {username, password}): void {
    commit('loginRequest', { username });
    userService.login(username, password).then(
      user => {
        commit('loginSuccess', user);
        router.push('/');
      },
      error => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    commit('logout');
  },
  register({dispatch, commit }, user): void {
    commit('registerRequest', user);
    userService.register(user).then(
      user => {
        commit('registerSuccess', user);
        router.push('/login');
        setTimeout(() => {
          dispatch('alert/success', 'Registration succesful', { root: true});
        });
      },
      error => {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true});
      }
    );
  }
};
