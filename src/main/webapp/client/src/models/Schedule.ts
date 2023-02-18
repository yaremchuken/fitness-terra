import { WorkoutPreview } from './workout/Workout'

type Schedule = {
  id?: number
  scheduledAt: Date
  completed: boolean
  previews: WorkoutPreview[]
}

export default Schedule
