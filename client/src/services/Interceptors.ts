import { AxiosHeaders } from 'axios'
import { getStoredData } from '../hooks/UseAuth'
import api from './Api'

const interceptors = (
  login: (uid: number, accessToken: string, refreshToken?: string) => void,
  logout: () => void
) => {
  api.interceptors.request.use(
    (config) => {
      const data = getStoredData()
      if (!config.url?.startsWith('auth') && data && data.accessToken) {
        config.headers = (config.headers ?? {}) as AxiosHeaders
        config.headers.set('Authorization', `Bearer ${data.accessToken}`)
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config

      if (error.response) {
        if (
          error.response.data === 'User does not exists' ||
          error.response.data === 'Refresh token invalid'
        ) {
          logout()
        } else if (
          error.response.status === 401 &&
          error.response.data.startsWith('JWT expired') &&
          !original._retry
        ) {
          original._retry = true

          const data = getStoredData()

          if (!data) logout()
          else {
            const rs = await api.post('auth/renew-token', {
              uid: data.uid,
              refreshToken: data.refreshToken,
            })
            login(rs.data.uid, rs.data.accessToken, rs.data.refreshToken)
          }

          return api(original)
        }
      }

      return Promise.reject(error)
    }
  )
}

export default interceptors
