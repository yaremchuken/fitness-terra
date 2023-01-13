import { Route, Routes } from 'react-router-dom'
import CollectionPage from './pages/collection-page/CollectionPage'
import WelcomePage from './pages/welcome-page/WelcomePage'

export const getRoutes = (isAuthenticated: boolean) => {
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path='*' element={<WelcomePage />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/welcome' element={<WelcomePage />} />
      <Route path='/collection' element={<CollectionPage />} />
      <Route path='*' element={<WelcomePage />} />
    </Routes>
  )
}
