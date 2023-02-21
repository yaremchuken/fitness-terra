import { WorkoutPreview } from './workout/Workout'

type Schedule = {
  id?: number
  scheduledAt: Date
  previews: WorkoutPreview[]
}

export default Schedule
