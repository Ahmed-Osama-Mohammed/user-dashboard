import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(action => // Use action.page here
        this.userService.getUsers(action.page).pipe( // Pass the page parameter
          map(users => loadUsersSuccess({ users })),
          catchError(error => loadUsersFailure({ error }))
        )
      )
    )
  );
}
