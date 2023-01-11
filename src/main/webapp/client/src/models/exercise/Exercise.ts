import { EquipmentType } from './EquipmentType'
import { ExerciseType } from './ExerciseType'
import { MuscleGroup } from './MuscleGroup'

type Exercise = {
  title: string
  type: ExerciseType
  muscleGroups: MuscleGroup[]
  repeats?: number
  duration?: number
  calories?: number
  equipments: EquipmentType[]
  weights: number[]
}

export default Exercise
