import { useCallback, useEffect, useState } from 'react'
import { Store } from 'redux'
import { clearStores } from '../actions/Action'

const storageName = 'fitnessterra'

type StoredUserData = {
  uid: number
  accessToken: string
  refreshToken: string
}

export const getStoredData = (): StoredUserData => {
  return JSON.parse(localStorage.getItem(storageName) as string)
}

const useAuth = (store: Store) => {
  const [uid, setUid] = useState<number | undefined>()
  const [accessToken, setAccessToken] = useState<string | undefined>()
  const [refreshToken, setRefreshToken] = useState<string | undefined>()

  const prepareStore = (uid: number): StoredUserData => {
    localStorage.setItem(storageName, JSON.stringify({ uid }))
    return { uid, accessToken: '', refreshToken: '' }
  }

  const storeTokens = useCallback((uid: number, accessToken?: string, refreshToken?: string) => {
    let data = getStoredData()

    if (!data || !data.uid) {
      setUid(uid)
      data = prepareStore(uid)
    }

    if (accessToken) {
      setAccessToken(accessToken)
      data.accessToken = accessToken
    }
    if (refreshToken) {
      setRefreshToken(refreshToken)
      data.refreshToken = refreshToken
    }

    localStorage.setItem(storageName, JSON.stringify(data))
  }, [])

  const login = useCallback(
    (uid: number, accessToken: string, refreshToken?: string) => {
      setUid(uid)
      const data = getStoredData()

      if (!data || !data.uid) {
        prepareStore(uid)
      }

      storeTokens(uid, accessToken, refreshToken)
    },
    [storeTokens]
  )

  const logout = useCallback(() => {
    setUid(undefined)
    setAccessToken(undefined)
    setRefreshToken(undefined)

    localStorage.removeItem(storageName)
    store.dispatch(clearStores())
  }, [])

  useEffect(() => {
    const data = getStoredData()
    if (data && data.accessToken) {
      login(data.uid, data.accessToken)
    } else {
      logout()
    }
  }, [login, logout])

  return { login, logout, accessToken, refreshToken, storeTokens, uid }
}

export default useAuth
