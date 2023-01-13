import { Action } from 'redux'
import { AuthActionType } from './AuthActionType'

export interface AuthAction extends Action<AuthActionType> {
  payload?: any
}

export const userlogin = (uid: number, accessToken: string, refreshToken: string) => {
  return {
    type: AuthActionType.USER_LOGIN,
    payload: { uid, accessToken, refreshToken },
  }
}
