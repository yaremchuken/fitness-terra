import Schedule from '../models/Schedule'
import api from './Api'

const baseUrl = 'schedule'

export const getPreviewsApi = async (): Promise<Schedule[]> => {
  return api.get(`${baseUrl}`).then((res) => res.data)
}

export const getScheduleApi = async (id: number): Promise<Schedule> => {
  return api.get(`${baseUrl}/${id}`).then((res) => res.data)
}

export const saveScheduleApi = async (schedule: Schedule): Promise<Schedule> => {
  return api.post(`${baseUrl}`, schedule).then((res) => res.data)
}
