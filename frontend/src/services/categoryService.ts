const API_URL = import.meta.env.VITE_API_URL + "/api"

export interface CategoryDto {
  id: string
  name: string
  slug: string
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/categories`)

  if (!response.ok) {
    throw new Error("Error al obtener categorías")
  }

  return await response.json()
}

export async function createCategory(name: string): Promise<CategoryDto> {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Error("Error al crear categoría")
  }

  return response.json()
}