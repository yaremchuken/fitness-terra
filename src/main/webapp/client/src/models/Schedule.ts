import { WorkoutPreview } from './workout/Workout'

type Schedule = {
  id?: number
  day: Date
  workouts: WorkoutPreview[]
}

export default Schedule
