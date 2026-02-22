import type { ImageItem } from "../types/Image"

const STORAGE_KEY = "images"

export function getStoredImages(): ImageItem[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveImages(images: ImageItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
}