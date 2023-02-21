import Workout, { WorkoutPreview } from '../models/workout/Workout'
import { decodeWorkoutFiles, decodeWorkoutPreviewsFiles } from '../utils/Utils'
import api from './Api'

const baseUrl = 'workout'

export const getPreviewsApi = async (): Promise<WorkoutPreview[]> => {
  return api
    .get(`${baseUrl}/previews`)
    .then((res) => res.data)
    .then(decodeWorkoutPreviewsFiles)
}

export const saveTemplateApi = async (workout: WorkoutPreview): Promise<WorkoutPreview> => {
  return api
    .post(`${baseUrl}/template`, workout)
    .then((res) => res.data)
    .then((w) => decodeWorkoutPreviewsFiles([w])[0])
}

export const getApi = async (id: number): Promise<Workout> => {
  return api
    .get(`${baseUrl}/${id}`)
    .then((res) => res.data)
    .then(decodeWorkoutFiles)
}
