import { ActivityType } from './ActivityType'
import { Equipment } from './Equipment'
import { MuscleGroup } from './MuscleGroup'

type Exercise = {
  id?: number
  title: string
  type: ActivityType
  muscleGroups: MuscleGroup[]
  repeats: number
  duration: number
  calories: number
  equipment: Equipment[]
}

export default Exercise
