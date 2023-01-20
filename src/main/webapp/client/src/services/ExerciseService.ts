import Exercise from '../models/exercise/Exercise'
import api from './Api'

const baseUrl = 'exercise'

export const getPreviewsApi = async (): Promise<Exercise[]> => {
  return api.get(`${baseUrl}/previews`).then((res) => res.data)
}

export const getTemplateApi = async (id: number): Promise<Exercise> => {
  return api
    .get(`${baseUrl}/template/${id}`)
    .then((res) => res.data)
    .then((data) => {
      return {
        ...data,
        media: data.media && new File([base64ToArrayBuffer(data.media)], `exercise_media_${id}`),
      }
    })
}

export const saveTemplateApi = async (exercise: Exercise): Promise<Exercise> => {
  return api
    .post(
      `${baseUrl}/template`,
      {
        media: exercise.media,
        exercise: new Blob([JSON.stringify({ ...exercise, media: undefined })], {
          type: 'application/json',
        }),
      },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.data)
}

const base64ToArrayBuffer = (base64: string) => {
  var binaryString = window.atob(base64)
  var binaryLen = binaryString.length
  var bytes = new Uint8Array(binaryLen)
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i)
    bytes[i] = ascii
  }
  return bytes
}
