import { Context, createContext } from 'react'
import { Store } from 'redux'

export interface AuthProps {
  uid?: number
  accessToken?: string
  refreshToken?: string
}

interface AuthContextProps extends AuthProps {
  login: (uid: number, accessToken: string, refreshToken?: string) => void
  logout: (store?: Store) => void
  storeTokens: (uid: number, accessToken?: string, refreshToken?: string) => void
  isAuthenticated: boolean
}

const AuthContext: Context<AuthContextProps> = createContext({} as AuthContextProps)

export default AuthContext
