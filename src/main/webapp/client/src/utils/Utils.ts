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
