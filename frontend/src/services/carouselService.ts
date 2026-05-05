const API_URL = import.meta.env.VITE_API_URL + "/api"

export interface CarouselImageDto {
  id: string
  imageUrl: string
  order: number
  isActive: boolean
  createdAt: string
}

async function throwIfError(res: Response): Promise<void> {
  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const body = await res.text()
      if (body) message += `: ${body}`
    } catch { /* ignore */ }
    throw new Error(message)
  }
}

export async function fetchActiveCarouselImages(): Promise<CarouselImageDto[]> {
  const res = await fetch(`${API_URL}/carousel`)
  await throwIfError(res)
  return res.json()
}

export async function fetchAllCarouselImages(): Promise<CarouselImageDto[]> {
  const res = await fetch(`${API_URL}/carousel/all`)
  await throwIfError(res)
  return res.json()
}

export async function uploadCarouselImage(file: File, order: number = 0): Promise<CarouselImageDto> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("order", String(order))
  const res = await fetch(`${API_URL}/carousel/upload`, { method: "POST", body: formData })
  await throwIfError(res)
  return res.json()
}

export async function deleteCarouselImage(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/carousel/${id}`, { method: "DELETE" })
  await throwIfError(res)
}

export async function updateCarouselOrder(id: string, order: number): Promise<CarouselImageDto> {
  const res = await fetch(`${API_URL}/carousel/${id}/order`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order }),
  })
  await throwIfError(res)
  return res.json()
}

export async function toggleCarouselImage(id: string): Promise<CarouselImageDto> {
  const res = await fetch(`${API_URL}/carousel/${id}/toggle`, { method: "PUT" })
  await throwIfError(res)
  return res.json()
}
