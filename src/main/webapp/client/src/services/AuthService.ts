import LoginData from '../models/LoginData'
import api from './Api'

const baseUrl = 'auth'

type AuthDTO = {
  uid: number
  accessToken: string
  refreshToken?: string
}

export const register = async (data: LoginData): Promise<AuthDTO> => {
  return api.post(`${baseUrl}/register`, data).then((res) => res.data)
}

export const login = async (data: LoginData): Promise<AuthDTO> => {
  return api.post(`${baseUrl}/login`, data).then((res) => res.data)
}
