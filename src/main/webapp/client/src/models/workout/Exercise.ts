import { ActivityType } from './ActivityType'
import { Equipment } from './Equipment'
import { MuscleGroup } from './MuscleGroup'

export type ExercisePreview = {
  id?: number
  title: string
  type: ActivityType
  muscleGroups: MuscleGroup[]
  preview?: File
}

type Exercise = ExercisePreview & {
  repeats: number
  duration: number
  calories: number
  equipment: Equipment[]
  media?: File
}

export default Exercise
