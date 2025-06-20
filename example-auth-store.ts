// Example Auth Store Implementation
// src/app/store/auth/auth.state.ts

export interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  sessionExpiry: number | null;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  sessionExpiry: null,
  isLoading: false,
  error: null
};

// src/app/store/auth/auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { username: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string; expiresIn: number }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const sessionExpired = createAction('[Auth] Session Expired');

export const refreshToken = createAction('[Auth] Refresh Token');

export const checkSession = createAction('[Auth] Check Session');

// src/app/store/auth/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, token, expiresIn }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    sessionExpiry: Date.now() + expiresIn * 1000,
    isLoading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),
  on(AuthActions.logout, AuthActions.sessionExpired, () => initialAuthState)
);

// src/app/store/auth/auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);

export const selectSessionExpiry = createSelector(
  selectAuthState,
  (state) => state.sessionExpiry
);

export const selectIsSessionExpired = createSelector(
  selectSessionExpiry,
  (expiry) => expiry ? Date.now() > expiry : false
);

// src/app/store/auth/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => AuthActions.loginSuccess({
            user: response.user,
            token: response.token,
            expiresIn: response.expiresIn
          })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ token, user }) => {
        localStorage.setItem('cu_acc', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout, AuthActions.sessionExpired),
      tap(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: any, // Your auth service
    private router: any
  ) {}
}

// Usage in Component:
// src/app/components/login/login.component.ts
/*
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';
import * as AuthSelectors from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="onLogin()">
      <input [(ngModel)]="username" placeholder="Username">
      <input [(ngModel)]="password" type="password" placeholder="Password">
      <button type="submit" [disabled]="isLoading$ | async">
        {{ (isLoading$ | async) ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <div *ngIf="error$ | async as error" class="error">{{ error }}</div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  isLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
  error$ = this.store.select(AuthSelectors.selectAuthError);

  constructor(private store: Store) {}

  onLogin() {
    this.store.dispatch(AuthActions.login({
      credentials: { username: this.username, password: this.password }
    }));
  }
}
*/
