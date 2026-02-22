import { useEffect, useState } from "react"
import type { ImageItem } from "../../types/Image"
import type { Category } from "../../types/Category"
import { getStoredImages, saveImages } from "../../utils/imageStorage"
import { getStoredCategories } from "../../utils/categoryStorage"

function AdminImages() {
const [images, setImages] = useState<ImageItem[]>(() => {
  return getStoredImages()
})

const [categories] = useState<Category[]>(() => {
  return getStoredCategories()
})

  const [selectedCategory, setSelectedCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")



  useEffect(() => {
    saveImages(images)
  }, [images])

  function handleAddImage() {
    if (!selectedCategory || !imageUrl.trim()) return

    const newImage: ImageItem = {
      id: Date.now(),
      categorySlug: selectedCategory,
      url: imageUrl,
      description,
    }

    setImages([...images, newImage])
    setImageUrl("")
    setDescription("")
  }

  function handleDelete(id: number) {
    setImages(images.filter((img) => img.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Gestión de Imágenes
      </h1>

      {/* Formulario */}
      <div className="bg-neutral-800 p-6 rounded-lg mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          Nueva Imagen
        </h2>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="URL de la imagen (por ahora manual)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600"
        />

        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600"
        />

        <button
          onClick={handleAddImage}
          className="bg-white text-black px-6 py-2 rounded font-medium"
        >
          Agregar Imagen
        </button>
      </div>

      {/* Lista */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.url}
              alt=""
              className="h-40 w-full object-cover rounded"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 bg-black/70 px-2 py-1 text-sm rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminImages