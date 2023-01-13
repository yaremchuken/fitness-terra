import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Header from './components/header/Header'
import Loader from './components/loader/Loader'
import MessagePopupContainer from './components/message-popup/MessagePopupContainer'
import AuthContext from './contexts/AuthContext'
import useAuth from './hooks/UseAuth'
import { useRoutes } from './Routes'
import interceptors from './services/Interceptors'
import store from './Store'

const App = () => {
  const { uid, accessToken, refreshToken, storeTokens, login, logout } = useAuth()
  const isAuthenticated = !!accessToken
  const routes = useRoutes(isAuthenticated)

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          uid,
          accessToken,
          refreshToken,
          storeTokens,
          login,
          logout,
          isAuthenticated,
        }}
      >
        <BrowserRouter>
          <main className='app-main'>
            <MessagePopupContainer />
            <Header isAuthenticated={isAuthenticated} logout={logout} />
            {routes}
          </main>
        </BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  )
}

interceptors(store)

export default App
