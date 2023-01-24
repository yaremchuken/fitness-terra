export type WorkoutPreview = {
  id?: number
  title: string
  previews: number[]
}

type Workout = WorkoutPreview & {
  breaks: number[]
}

export default Workout
