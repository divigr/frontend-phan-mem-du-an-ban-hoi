// utils/cropImage.ts
import { Area } from 'react-easy-crop'

export default function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const { width, height } = crop
      canvas.width = width
      canvas.height = height

      ctx?.drawImage(
        image,
        crop.x, // Source x-coordinate
        crop.y, // Source y-coordinate
        width, // Source width
        height, // Source height
        0, // Destination x
        0, // Destination y
        width, // Destination width
        height // Destination height
      )

      canvas.toBlob((blob) => {
        if (!blob) {
          return reject(new Error('Canvas is empty'))
        }
        const fileUrl = URL.createObjectURL(blob)
        resolve(fileUrl)
      }, 'image/jpeg')
    }
    image.onerror = (error) => reject(error)
  })
}
