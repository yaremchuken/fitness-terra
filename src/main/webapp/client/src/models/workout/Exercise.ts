import { ActivityType } from './ActivityType'
import { Equipment } from './Equipment'
import { MuscleGroup } from './MuscleGroup'

export type ExercisePreview = {
  id?: number
  templateId?: number
  title: string
  type: ActivityType
  muscleGroups: MuscleGroup[]
  description: string
  repeats: number
  duration: number
  calories: number
  equipment: Equipment[]
  preview?: File
}

type Exercise = ExercisePreview & {
  media?: File
}

export default Exercise
