import { MediaType } from '../models/MediaType'
import Workout, { WorkoutPreview } from '../models/workout/Workout'
import { base64toFile } from '../utils/Utils'
import api from './Api'

const baseUrl = 'workout'

export const getPreviewsApi = async (): Promise<WorkoutPreview[]> => {
  return api
    .get(`${baseUrl}/previews`)
    .then((res) => res.data)
    .then(decodePreviews)
}

export const getWorkoutApi = async (id: number): Promise<Workout> => {
  return api
    .get(`${baseUrl}/${id}`)
    .then((res) => res.data)
    .then(decodeWorkout)
}

export const saveWorkoutApi = async (workout: WorkoutPreview): Promise<WorkoutPreview> => {
  return api
    .post(`${baseUrl}`, workout)
    .then((res) => res.data)
    .then((w) => decodePreviews([w])[0])
}

const decodePreviews = (workouts: WorkoutPreview[]) =>
  workouts.map((workout: WorkoutPreview) => {
    return {
      ...workout,
      previews: workout.previews.map((exercise) => {
        return {
          ...exercise,
          preview:
            exercise.preview &&
            base64toFile(exercise.preview as any, MediaType.EXERCISE_PREVIEW, exercise.id!!),
        }
      }),
    }
  })

const decodeWorkout = (workout: Workout) => {
  return {
    ...workout,
    exercises: workout.exercises.map((exercise) => {
      return {
        ...exercise,
        preview:
          exercise.preview &&
          base64toFile(exercise.preview as any, MediaType.EXERCISE_PREVIEW, exercise.id!!),
        media:
          exercise.media &&
          base64toFile(exercise.media as any, MediaType.EXERCISE_MEDIA, exercise.id!!),
      }
    }),
  }
}
