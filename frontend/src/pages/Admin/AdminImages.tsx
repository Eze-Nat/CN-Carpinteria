import { useEffect, useRef, useState } from "react"
import { fetchCategories } from "../../services/categoryService"
import type { CategoryDto } from "../../services/categoryService"
import {
  fetchAllImages,
  uploadImage,
  deleteImage,
} from "../../services/imageService"
import type { ImageApiItem } from "../../services/imageService"

function AdminImages() {
  const [images, setImages] = useState<ImageApiItem[]>([])
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [cats, imgs] = await Promise.all([fetchCategories(), fetchAllImages()])
      setCategories(cats)
      setImages(imgs)
    } catch {
      setError("Error al cargar datos")
    }
  }

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0]
    if (!file || !selectedCategoryId) {
      setError("Seleccioná una categoría y un archivo.")
      return
    }

    setError("")
    setUploading(true)

    try {
      const created = await uploadImage(file, selectedCategoryId, description || undefined)
      setImages((prev) => [...prev, created])
      setDescription("")
      setSelectedCategoryId("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch {
      setError("Error al subir la imagen. Intentá de nuevo.")
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteImage(id)
      setImages((prev) => prev.filter((img) => img.id !== id))
    } catch {
      setError("Error al eliminar la imagen.")
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Imágenes</h1>

      <div className="bg-neutral-800 p-6 rounded-lg mb-8 space-y-4">
        <h2 className="text-xl font-semibold">Nueva Imagen</h2>

        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-neutral-600 file:text-white"
        />

        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-white text-black px-6 py-2 rounded font-medium disabled:opacity-50"
        >
          {uploading ? "Subiendo..." : "Subir Imagen"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => {
          const cat = categories.find((c) => c.id === img.categoryId)
          return (
            <div key={img.id} className="relative group">
              <img
                src={img.url}
                alt={img.description || ""}
                className="h-40 w-full object-cover rounded"
              />
              {cat && (
                <span className="absolute bottom-2 left-2 bg-black/60 text-xs px-2 py-0.5 rounded">
                  {cat.name}
                </span>
              )}
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-black/70 px-2 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                X
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminImages
