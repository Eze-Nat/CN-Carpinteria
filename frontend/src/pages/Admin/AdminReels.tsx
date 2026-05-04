import { useEffect, useRef, useState } from "react"
import { fetchReels, uploadReel, deleteReel } from "../../services/reelService"
import type { ReelApiItem } from "../../services/reelService"

function AdminReels() {
  const [reels, setReels] = useState<ReelApiItem[]>([])
  const [title, setTitle] = useState("")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadReels()
  }, [])

  async function loadReels() {
    try {
      const data = await fetchReels()
      setReels(data)
    } catch {
      setError("Error al cargar los reels")
    }
  }

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0]
    if (!file || !title.trim()) {
      setError("Escribí un título y seleccioná un video.")
      return
    }

    setError("")
    setUploading(true)

    try {
      const created = await uploadReel(file, title.trim())
      setReels((prev) => [created, ...prev])
      setTitle("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch {
      setError("Error al subir el reel. Intentá de nuevo.")
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminár este reel?")) return
    try {
      await deleteReel(id)
      setReels((prev) => prev.filter((r) => r.id !== id))
    } catch {
      setError("Error al eliminar el reel.")
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Reels</h1>

      {/* Upload form */}
      <div className="bg-neutral-800 p-6 rounded-lg mb-8 space-y-4">
        <h2 className="text-xl font-semibold">Subir nuevo reel</h2>

        <input
          type="text"
          placeholder="Título del reel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600 text-white placeholder:text-neutral-400"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-neutral-600 file:text-white"
        />

        <p className="text-neutral-400 text-xs">
          Formatos aceptados: MP4, MOV, WebM. El thumbnail se genera automáticamente.
        </p>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-neutral-200 transition disabled:opacity-50"
        >
          {uploading ? "Subiendo a Cloudinary..." : "Subir Reel"}
        </button>
      </div>

      {/* Reels grid */}
      {reels.length === 0 ? (
        <p className="text-neutral-400">No hay reels todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reels.map((reel) => (
            <div key={reel.id} className="bg-neutral-800 rounded-lg overflow-hidden">
              {reel.thumbnailUrl ? (
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.title}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-neutral-700 flex items-center justify-center text-neutral-500 text-sm">
                  Sin thumbnail
                </div>
              )}
              <div className="p-4 flex justify-between items-center gap-3">
                <p className="font-medium text-sm text-white truncate">{reel.title}</p>
                <button
                  onClick={() => handleDelete(reel.id)}
                  className="text-red-400 hover:text-red-300 text-sm transition shrink-0"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminReels
