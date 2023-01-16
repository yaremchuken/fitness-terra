import Exercise from '../models/exercise/Exercise'
import api from './Api'

const baseUrl = 'exercise'

export const getAllApi = async (): Promise<Exercise[]> => {
  return api.get(`${baseUrl}`).then((res) => res.data)
}

export const saveApi = async (exercise: Exercise): Promise<Exercise> => {
  return api.post(`${baseUrl}`, exercise).then((res) => res.data)
}
