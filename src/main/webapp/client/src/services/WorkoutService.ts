import Workout, { WorkoutPreview } from '../models/workout/Workout'
import api from './Api'

const baseUrl = 'workout'

export const getPreviewsApi = async (): Promise<WorkoutPreview[]> => {
  return api.get(`${baseUrl}/previews`).then((res) => res.data)
}

export const getWorkoutApi = async (id: number): Promise<Workout> => {
  return api.get(`${baseUrl}/${id}`).then((res) => res.data)
}

export const saveWorkoutApi = async (workout: Workout): Promise<WorkoutPreview> => {
  return api.post(`${baseUrl}`, workout).then((res) => res.data)
}
