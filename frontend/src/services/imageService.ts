const API_URL = import.meta.env.VITE_API_URL + "/api"

export interface ImageApiItem {
  id: string
  url: string
  description?: string
  categoryId: string
}

export async function fetchAllImages(): Promise<ImageApiItem[]> {
  const response = await fetch(`${API_URL}/images`)
  if (!response.ok) throw new Error("Error al obtener imágenes")
  return response.json()
}

export async function fetchImagesByCategory(categoryId: string): Promise<ImageApiItem[]> {
  const response = await fetch(`${API_URL}/images/category/${categoryId}`)
  if (!response.ok) throw new Error("Error al obtener imágenes de la categoría")
  return response.json()
}

export async function uploadImage(
  file: File,
  categoryId: string,
  description?: string
): Promise<ImageApiItem> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("categoryId", categoryId)
  if (description) formData.append("description", description)

  const response = await fetch(`${API_URL}/images/upload`, {
    method: "POST",
    body: formData,
  })
  if (!response.ok) throw new Error("Error al subir la imagen")
  return response.json()
}

export async function deleteImage(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/images/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Error al eliminar la imagen")
}
