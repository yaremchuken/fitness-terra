import { Route, Routes } from 'react-router-dom'
import LibraryPage from './pages/library-page/LibraryPage'
import WelcomePage from './pages/welcome-page/WelcomePage'

export const useRoutes = (isAuthenticated: boolean) => {
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
      <Route path='/library' element={<LibraryPage />} />
      <Route path='*' element={<WelcomePage />} />
    </Routes>
  )
}
