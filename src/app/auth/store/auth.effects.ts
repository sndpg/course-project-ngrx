import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AttemptLogin, AttemptSignUp, AuthAction } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthAction.AttemptSignUp),
    map((action: AttemptSignUp) => {
      return action.payload;
    }),
    switchMap((authData: { username: string; password: string }) => {
      return from(
        firebase
          .auth()
          .createUserWithEmailAndPassword(authData.username, authData.password)
      );
    }),
    switchMap((userCredential: firebase.auth.UserCredential) => {
      return from(userCredential.user.getIdToken());
    }),
    tap(() => {
      this.router.navigate(['recipes']);
    }),
    mergeMap((token: string) => {
      return [
        {
          type: AuthAction.SignUp
        },
        {
          type: AuthAction.SetToken,
          token
        }
      ];
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthAction.AttemptLogin),
    map((action: AttemptLogin) => {
      return action.payload;
    }),
    switchMap((authData: { email: string; password: string }) => {
      return from(
        firebase
          .auth()
          .signInWithEmailAndPassword(authData.email, authData.password)
      );
    }),
    switchMap((userCredential: firebase.auth.UserCredential) => {
      return from(userCredential.user.getIdToken());
    }),
    tap(() => {
      this.router.navigate(['recipes']);
    }),
    mergeMap((token: string) => {
      return [
        {
          type: AuthAction.Login
        },
        {
          type: AuthAction.SetToken,
          payload: token
        }
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthAction.Logout),
    tap(() => this.router.navigate(['/']))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
