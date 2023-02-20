import Schedule from '../models/Schedule'
import { fromLocalDate, toLocalDate } from '../utils/Utils'
import api from './Api'
import { decodeWorkoutPreviews } from './WorkoutService'

const baseUrl = 'schedule'

export const getPreviewsApi = async (begin: Date, end: Date): Promise<Schedule[]> => {
  return api
    .get(`${baseUrl}/previews`, {
      params: { begin: toLocalDate(begin), end: toLocalDate(end) },
    })
    .then((res) => res.data.map((d: any) => format(d)))
}

export const getScheduleApi = async (id: number): Promise<Schedule> => {
  return api.get(`${baseUrl}/${id}`).then((res) => format(res.data))
}

export const saveScheduleApi = async (schedule: Schedule): Promise<Schedule> => {
  return api.post(`${baseUrl}`, schedule).then((res) => format(res.data))
}

const format = (schedule: any): Schedule => {
  return {
    ...schedule,
    previews: decodeWorkoutPreviews(schedule.previews),
    scheduledAt: fromLocalDate(schedule.scheduledAt),
  }
}
