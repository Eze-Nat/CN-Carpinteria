const API_URL = import.meta.env.VITE_API_URL + "/api"

export interface ProjectImageDto {
  id: string
  imageUrl: string
  order: number
}

export interface ProjectDto {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  categorySlug: string
  coverImageUrl: string
  createdAt: string
}

export interface ProjectDetailDto extends ProjectDto {
  images: ProjectImageDto[]
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

export async function fetchProjects(): Promise<ProjectDto[]> {
  const res = await fetch(`${API_URL}/projects`)
  await throwIfError(res)
  return res.json()
}

export async function fetchProjectsBySlug(slug: string): Promise<ProjectDto[]> {
  const res = await fetch(`${API_URL}/projects/category/${slug}`)
  await throwIfError(res)
  return res.json()
}

export async function fetchProjectById(id: string): Promise<ProjectDetailDto> {
  const res = await fetch(`${API_URL}/projects/${id}`)
  await throwIfError(res)
  return res.json()
}

export async function createProject(data: {
  name: string
  description: string
  categoryId: string
  coverImage?: File
}): Promise<ProjectDetailDto> {
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("description", data.description)
  formData.append("categoryId", data.categoryId)
  if (data.coverImage) formData.append("coverImage", data.coverImage)

  const res = await fetch(`${API_URL}/projects`, { method: "POST", body: formData })
  await throwIfError(res)
  return res.json()
}

export async function updateProject(id: string, data: {
  name: string
  description: string
  coverImageUrl?: string
  coverImage?: File
}): Promise<ProjectDetailDto> {
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("description", data.description)
  if (data.coverImageUrl) formData.append("coverImageUrl", data.coverImageUrl)
  if (data.coverImage) formData.append("coverImage", data.coverImage)

  const res = await fetch(`${API_URL}/projects/${id}`, { method: "PUT", body: formData })
  await throwIfError(res)
  return res.json()
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" })
  await throwIfError(res)
}

export async function addProjectImage(projectId: string, file: File, order: number = 0): Promise<ProjectImageDto> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("order", String(order))

  const res = await fetch(`${API_URL}/projects/${projectId}/images`, { method: "POST", body: formData })
  await throwIfError(res)
  return res.json()
}

export async function deleteProjectImage(imageId: string): Promise<void> {
  const res = await fetch(`${API_URL}/project-images/${imageId}`, { method: "DELETE" })
  await throwIfError(res)
}
