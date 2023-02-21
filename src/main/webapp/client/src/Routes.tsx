import { Route, Routes } from 'react-router-dom'
import ExercisesPage from './pages/collection/exercises-page/ExercisesPage'
import WorkoutsPage from './pages/collection/workouts-page/WorkoutsPage'
import PerformPage from './pages/perform-page/PerformPage'
import SchedulePage from './pages/schedule-page/SchedulePage'
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
      <Route path='/workouts' element={<WorkoutsPage />} />
      <Route path='/schedule' element={<SchedulePage />} />
      <Route path='/perform' element={<PerformPage />} />
      <Route path='*' element={<WelcomePage />} />
    </Routes>
  )
}
