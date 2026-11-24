export type Raster = {
  buffer: ArrayBuffer
  width: number
  height: number
}

const MAX_EDGE = 640

/** Downscale a photo to RGBA pixels the embedding worker can read. */
export async function rasterize(source: Blob, maxEdge = MAX_EDGE): Promise<Raster> {
  const bitmap = await createImageBitmap(source)
  try {
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) throw new Error('This browser could not read the image.')
    context.drawImage(bitmap, 0, 0, width, height)
    const pixels = context.getImageData(0, 0, width, height).data
    const buffer = pixels.buffer.slice(pixels.byteOffset, pixels.byteOffset + pixels.byteLength)
    return { buffer, width, height }
  } finally {
    bitmap.close()
  }
}
