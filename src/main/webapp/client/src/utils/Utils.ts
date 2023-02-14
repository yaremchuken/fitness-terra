import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { MediaType } from '../models/MediaType'

export const base64toFile = (base64: string, type: MediaType, id: number) => {
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

export const getDndBackend = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints ? TouchBackend : HTML5Backend
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  })
}
