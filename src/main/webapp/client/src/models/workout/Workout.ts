import Exercise, { ExercisePreview } from './Exercise'

export type IWorkout = {
  id?: number
  templateId?: number
  index?: number
  title: string
  rests: number[]
  completed: boolean
}

export type WorkoutPreview = IWorkout & {
  previews: ExercisePreview[]
}

type Workout = IWorkout & {
  exercises: Exercise[]
}

export default Workout
