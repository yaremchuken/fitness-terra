import Exercise, { ExercisePreview } from '../models/exercise/Exercise'
import { MediaType } from '../models/MediaType'
import api from './Api'

const baseUrl = 'exercise'

export const getPreviewsApi = async (): Promise<ExercisePreview[]> => {
  return api
    .get(`${baseUrl}/previews`)
    .then((res) => res.data)
    .then((data) => {
      return data.map((ex: any) => {
        return {
          ...ex,
          preview: ex.preview && base64toFile(ex.preview, MediaType.EXERCISE_PREVIEW, ex.id),
        }
      })
    })
}

export const getTemplateApi = async (id: number): Promise<Exercise> => {
  return api
    .get(`${baseUrl}/template/${id}`)
    .then((res) => res.data)
    .then((data) => {
      return {
        ...data,
        preview: data.preview && base64toFile(data.preview, MediaType.EXERCISE_PREVIEW, id),
        media: data.media && base64toFile(data.media, MediaType.EXERCISE_MEDIA, id),
      }
    })
}

export const saveTemplateApi = async (exercise: Exercise): Promise<ExercisePreview> => {
  return api
    .post(
      `${baseUrl}/template`,
      {
        exercise: new Blob(
          [JSON.stringify({ ...exercise, preview: undefined, media: undefined })],
          {
            type: 'application/json',
          }
        ),
        preview: exercise.preview,
        media: exercise.media,
      },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.data)
    .then((data) => {
      return {
        ...data,
        preview: data.preview && base64toFile(data.preview, MediaType.EXERCISE_PREVIEW, data.id),
      }
    })
}

const base64toFile = (base64: string, type: MediaType, id: number) => {
  return new File([base64ToArrayBuffer(base64)], `${type}_${id}`)
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
