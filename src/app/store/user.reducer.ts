import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, loadUsersFailure } from './user.actions';
import { User } from '../models/user.model';

export interface State {
  users: User[];
  error: any;
}

export const initialState: State = {
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error })),
);
