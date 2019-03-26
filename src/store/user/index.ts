import { UserState } from './types';
import { actions } from './user.actions';
import { mutations } from './user.mutations';

const state: UserState = {
  all: {},
};

export const users = {
  namespaced: true,
  state,
  actions,
  mutations
};

