import { AxiosHeaders } from 'axios'
import { Store } from 'redux'
import { clearStores } from '../actions/Action'
import api from './Api'

const storageName = 'fitnessterra'

type StoredUserData = {
  uid: number
  accessToken: string
  refreshToken: string
}

const getStoredData = (): StoredUserData => {
  return JSON.parse(localStorage.getItem(storageName) as string)
}

const persistData = (data: StoredUserData) => {
  localStorage.setItem(storageName, JSON.stringify(data))
}

const interceptors = (store: Store) => {
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

      if (error.response && error.response.status === 401) {
        if (error.response.data === 'User does not exists') {
          localStorage.removeItem(storageName)

          if (store) {
            store.dispatch(clearStores())
          }
        } else if (error.response.data.startsWith('JWT expired') && !original._retry) {
          original._retry = true

          const data = getStoredData()

          const rs = await api.post('auth/renew-token', {
            uid: data.uid,
            refreshToken: data.refreshToken,
          })

          persistData({ ...rs.data })

          return api(original)
        }
      }

      return Promise.reject(error)
    }
  )
}

export default interceptors
