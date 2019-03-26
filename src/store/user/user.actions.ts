import { ActionTree } from 'vuex';
import { UserState } from './types';
import { userService } from '../../services';
import { RootState } from '../types';

export const actions: ActionTree<UserState, RootState> = {
  getAll({ commit }) {
    commit('getAllRequest');

    userService.getAll()
      .then(
        users => commit('getAllSuccess', users),
        error => commit('getAllFailure', error)
      );
  },

  delete({ commit }, id) {
    commit('deleteRequest', id);

    userService.deleteById(id)
      .then(
        user => commit('deleteSuccess', id),
        error => commit('deleteSuccess', { id, error: error.toString() })
      );
  }
};
