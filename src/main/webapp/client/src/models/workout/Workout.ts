import Exercise, { ExercisePreview } from './Exercise'

export type IWorkout = {
  id?: number
  title: string
  rests: number[]
}

export type WorkoutPreview = IWorkout & {
  previews: ExercisePreview[]
}

type Workout = IWorkout & {
  exercises: Exercise[]
}

export default Workout
