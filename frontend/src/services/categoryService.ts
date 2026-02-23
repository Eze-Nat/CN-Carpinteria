const API_BASE_URL = "https://localhost:7121/api";

export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
}

export async function fetchCategories(): Promise<CategoryDto[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Error al obtener categorías");
  }

  return response.json();
}

export async function createCategory(name: string): Promise<CategoryDto> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Error al crear categoría");
  }

  return response.json();
}