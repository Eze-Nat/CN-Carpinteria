import { useEffect, useRef, useState } from "react"
import {
  fetchAllCarouselImages,
  uploadCarouselImage,
  deleteCarouselImage,
  updateCarouselOrder,
  toggleCarouselImage,
} from "../../services/carouselService"
import type { CarouselImageDto } from "../../services/carouselService"

function AdminCarousel() {
  const [images, setImages] = useState<CarouselImageDto[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editingOrder, setEditingOrder] = useState<Record<string, string>>({})

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const data = await fetchAllCarouselImages()
      setImages(data)
      const orders: Record<string, string> = {}
      data.forEach((img) => { orders[img.id] = String(img.order) })
      setEditingOrder(orders)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error"
      setError(`Error al cargar: ${msg}`)
    }
  }

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0]
    if (!file) { setError("Seleccioná una imagen."); return }

    setError("")
    setUploading(true)
    try {
      const nextOrder = images.length > 0 ? Math.max(...images.map((i) => i.order)) + 1 : 0
      const created = await uploadCarouselImage(file, nextOrder)
      setImages((prev) => [...prev, created])
      setEditingOrder((prev) => ({ ...prev, [created.id]: String(created.order) }))
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error"
      setError(`Error al subir: ${msg}`)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta imagen del carousel?")) return
    try {
      await deleteCarouselImage(id)
      setImages((prev) => prev.filter((img) => img.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error"
      setError(`Error al eliminar: ${msg}`)
    }
  }

  async function handleToggle(id: string) {
    try {
      const updated = await toggleCarouselImage(id)
      setImages((prev) => prev.map((img) => img.id === id ? updated : img))
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error"
      setError(`Error: ${msg}`)
    }
  }

  async function handleOrderSave(id: string) {
    const newOrder = parseInt(editingOrder[id] ?? "0", 10)
    if (isNaN(newOrder)) return
    try {
      const updated = await updateCarouselOrder(id, newOrder)
      setImages((prev) =>
        prev.map((img) => img.id === id ? updated : img).sort((a, b) => a.order - b.order)
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error"
      setError(`Error al actualizar orden: ${msg}`)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Carousel principal</h1>

      {/* Upload */}
      <div className="bg-neutral-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Agregar imagen</h2>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="flex-1 px-4 py-2 rounded bg-neutral-700 border border-neutral-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-neutral-600 file:text-white text-white"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-neutral-200 transition disabled:opacity-50 shrink-0"
          >
            {uploading ? "Subiendo..." : "Subir"}
          </button>
        </div>
        <p className="text-neutral-500 text-xs mt-2">
          Recomendado: 1920×1080px o similar (horizontal). El orden se asigna automáticamente.
        </p>
        {error && (
          <div className="mt-3 bg-red-950 border border-red-800 text-red-300 text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Grid */}
      {images.length === 0 ? (
        <p className="text-neutral-400">No hay imágenes en el carousel todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {images
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((img) => (
              <div
                key={img.id}
                className={`bg-neutral-800 rounded-lg overflow-hidden border-2 transition ${
                  img.isActive ? "border-neutral-700" : "border-red-900/60"
                }`}
              >
                <div className="relative">
                  <img
                    src={img.imageUrl}
                    alt=""
                    className={`w-full h-40 object-cover transition ${!img.isActive ? "opacity-40 grayscale" : ""}`}
                  />
                  {!img.isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/70 text-red-400 text-xs px-2 py-1 rounded">Inactiva</span>
                    </div>
                  )}
                </div>

                <div className="p-3 flex items-center gap-3">
                  {/* Order input */}
                  <div className="flex items-center gap-1.5">
                    <label className="text-neutral-500 text-xs">Orden:</label>
                    <input
                      type="number"
                      value={editingOrder[img.id] ?? img.order}
                      onChange={(e) =>
                        setEditingOrder((prev) => ({ ...prev, [img.id]: e.target.value }))
                      }
                      onBlur={() => handleOrderSave(img.id)}
                      onKeyDown={(e) => e.key === "Enter" && handleOrderSave(img.id)}
                      className="w-14 px-2 py-1 rounded bg-neutral-700 border border-neutral-600 text-white text-sm text-center"
                    />
                  </div>

                  <div className="flex-1" />

                  {/* Toggle */}
                  <button
                    onClick={() => handleToggle(img.id)}
                    className={`text-xs px-3 py-1.5 rounded transition ${
                      img.isActive
                        ? "bg-green-900/40 text-green-400 hover:bg-green-900/60"
                        : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                    }`}
                  >
                    {img.isActive ? "Activa" : "Inactiva"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-red-400 hover:text-red-300 text-sm transition px-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default AdminCarousel
