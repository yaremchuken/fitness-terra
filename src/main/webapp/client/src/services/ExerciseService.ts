import Exercise from '../models/exercise/Exercise'
import api from './Api'

const baseUrl = 'exercise'

export const getAllTemplatesApi = async (): Promise<Exercise[]> => {
  return api.get(`${baseUrl}/template`).then((res) => res.data)
}

export const saveTemplateApi = async (exercise: Exercise): Promise<Exercise> => {
  return api.post(`${baseUrl}/template`, exercise).then((res) => res.data)
}
