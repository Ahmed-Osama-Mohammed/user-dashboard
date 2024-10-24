import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User List] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User API] Load Users Failure', props<{ error: any }>());
