import type { Category } from "../types/Category"

export function getStoredCategories(): Category[] {
  const stored = localStorage.getItem("categories")
  return stored ? JSON.parse(stored) : []
}