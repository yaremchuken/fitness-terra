import { IndexedExercise } from '../../pages/collection/workouts-page/exercise-block/ExerciseBlock'
import Exercise, { ExercisePreview } from './Exercise'

export type IWorkout = {
  id?: number
  title: string
  rests: number[]
}

export type WorkoutPreview = IWorkout & {
  previews: IndexedExercise[]
}

type Workout = IWorkout & {
  exercises: Exercise[]
}

export default Workout
