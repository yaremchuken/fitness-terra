import { AxiosHeaders } from 'axios'
import api from './Api'

const interceptors = (
  login: (uid: number, accessToken: string, refreshToken?: string) => void,
  logout: () => void,
  uid?: number,
  accessToken?: String,
  refreshToken?: String
) => {
  api.interceptors.request.use(
    (config) => {
      if (!config.url?.startsWith('auth') && accessToken) {
        config.headers = (config.headers ?? {}) as AxiosHeaders
        config.headers.set('Authorization', `Bearer ${accessToken}`)
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config

      if (error.response && error.response.status === 401) {
        if (error.response.data === 'User does not exists') {
          logout()
        } else if (error.response.data.startsWith('JWT expired') && !original._retry) {
          original._retry = true

          const rs = await api.post('auth/renew-token', { uid, refreshToken })

          login(rs.data.uid, rs.data.accessToken, rs.data.refreshToken)

          return api(original)
        }
      }

      return Promise.reject(error)
    }
  )
}

export default interceptors
