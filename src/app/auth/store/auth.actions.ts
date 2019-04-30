import { Action } from '@ngrx/store';

export enum AuthAction {
  AttemptSignUp = 'ATTEMPT_SIGN_UP',
  AttemptLogin = 'ATTEMPT_LOGIN',
  SignUp = 'SIGN_UP',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  SetToken = 'SET_TOKEN'
}

export class AttemptSignUp implements Action {
  readonly type = AuthAction.AttemptSignUp;

  constructor(public payload: { username: string; password: string }) {}
}

export class AttemptLogin implements Action {
  readonly type = AuthAction.AttemptLogin;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignUp implements Action {
  readonly type = AuthAction.SignUp;
}

export class Login implements Action {
  readonly type = AuthAction.Login;
}

export class Logout implements Action {
  readonly type = AuthAction.Logout;
}

export class SetToken implements Action {
  readonly type = AuthAction.SetToken;

  constructor(public payload: string) {}
}

export type AuthActions =
  | SignUp
  | Login
  | Logout
  | SetToken
  | AttemptSignUp
  | AttemptLogin;
