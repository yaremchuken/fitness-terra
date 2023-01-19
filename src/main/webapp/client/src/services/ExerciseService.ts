import Exercise from '../models/exercise/Exercise'
import api from './Api'

const baseUrl = 'exercise'

export const getAllTemplatesApi = async (): Promise<Exercise[]> => {
  return api.get(`${baseUrl}/template`).then((res) => res.data)
}

export const saveTemplateApi = async (exercise: Exercise): Promise<Exercise> => {
  return api
    .post(`${baseUrl}/template`, exercise)
    .then((res) => res.data)
    .then((data) => {
      if (exercise.media) {
        api
          .post(
            `media`,
            { id: data.id, type: 'EXERCISE_MEDIA', media: exercise.media },
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          )
          .then(() => {
            return Promise.resolve(data)
          })
      } else return Promise.resolve(data)
    })
}
