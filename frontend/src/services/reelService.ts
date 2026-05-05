const API_URL = import.meta.env.VITE_API_URL + "/api"

export interface ReelApiItem {
  id: string
  title: string
  videoUrl: string
  thumbnailUrl?: string
  createdAt: string
}

export async function fetchReels(): Promise<ReelApiItem[]> {
  const response = await fetch(`${API_URL}/reels`)
  if (!response.ok) throw new Error("Error al obtener reels")
  return response.json()
}

export async function uploadReel(file: File, title: string): Promise<ReelApiItem> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("title", title)

  const response = await fetch(`${API_URL}/reels/upload`, {
    method: "POST",
    body: formData,
  })
  if (!response.ok) throw new Error("Error al subir el reel")
  return response.json()
}

export async function deleteReel(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/reels/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Error al eliminar el reel")
}
