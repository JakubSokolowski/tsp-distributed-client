import { Module } from 'vuex';
import { actions } from './alert.actions';
import { mutations } from './alert.mutations';
import { AlertState } from './types';
import { RootState } from '../types';

const state: AlertState = {
  type: undefined,
  message: undefined
};

export const alert: Module<AlertState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
