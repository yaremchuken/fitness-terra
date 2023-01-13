import { AuthAction } from '../actions/AuthAction'
import { AuthActionType } from '../actions/AuthActionType'
import { AuthProps } from '../contexts/AuthContext'

export type State = {
  isAuthenticated: boolean
} & AuthProps

const initialState = {
  isAuthenticated: false,
}

const reducer = (state: State = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.CLEAR_STORES:
      return { ...initialState }

    case AuthActionType.USER_LOGIN:
      return {
        ...state,
        uid: action.payload.uid,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: action.payload.accessToken !== undefined,
      }

    default:
      return state
  }
}

export default reducer
