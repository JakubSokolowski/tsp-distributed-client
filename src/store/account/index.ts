import { Module } from 'vuex';
import { actions } from './account.actions';
import { mutations } from './account.mutations';
import { AccountState, User } from './types';
import { RootState } from '../types';

const user: User = JSON.parse(<string>localStorage.getItem('user'));
const state: AccountState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: undefined };

export const account: Module<AccountState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
