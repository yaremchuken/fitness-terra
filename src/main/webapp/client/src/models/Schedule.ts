import { WorkoutPreview } from './workout/Workout'

type Schedule = {
  id?: number
  scheduledAt: Date
  completed: boolean
  workouts: WorkoutPreview[]
}

export default Schedule
