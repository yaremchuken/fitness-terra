import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Header from './components/header/Header'
import MessagePopupContainer from './components/message-popup/MessagePopupContainer'
import AuthContext from './contexts/AuthContext'
import useAuth from './hooks/UseAuth'
import { getRoutes } from './Routes'
import interceptors from './services/Interceptors'
import store from './Store'

const App = () => {
  const { uid, accessToken, storeTokens, login, logout } = useAuth(store)
  const isAuthenticated = !!accessToken
  const routes = getRoutes(isAuthenticated)

  interceptors(login, logout)

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          uid,
          accessToken,
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

export default App
