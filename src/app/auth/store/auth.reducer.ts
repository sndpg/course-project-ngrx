import { AuthActions, AuthAction } from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthAction.SignUp:
    case AuthAction.Login:
      return {
        ...state,
        authenticated: true
      };

    case AuthAction.Logout:
      return {
        ...state,
        token: null,
        authenticated: false
      };

    case AuthAction.SetToken:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
