import { Route, Routes } from 'react-router-dom'
import ExercisesPage from './pages/collection/exercises-page/ExercisesPage'
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
      <Route path='/exercises' element={<ExercisesPage />} />
      <Route path='*' element={<WelcomePage />} />
    </Routes>
  )
}
