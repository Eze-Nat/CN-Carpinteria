import { useEffect, useState } from "react"
import { fetchCategories, createCategory, deleteCategory } from "../../services/categoryService"
import type { CategoryDto } from "../../services/categoryService"

function AdminCategories() {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [newCategoryName, setNewCategoryName] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch {
      setError("Error al cargar categorías")
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd() {
    if (!newCategoryName.trim()) return
    setError("")
    try {
      await createCategory(newCategoryName.trim())
      setNewCategoryName("")
      await loadCategories()
    } catch {
      setError("Error al crear categoría. ¿Ya existe?")
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar la categoría "${name}" y todos sus proyectos?`)) return
    setError("")
    try {
      await deleteCategory(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch {
      setError("Error al eliminar categoría.")
    }
  }

  if (loading) return <p className="text-neutral-400">Cargando...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Categorías</h1>

      {/* Nueva categoría */}
      <div className="bg-neutral-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Nueva Categoría</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 px-4 py-2 rounded bg-neutral-700 border border-neutral-600 text-white placeholder:text-neutral-400"
          />
          <button
            onClick={handleAdd}
            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-neutral-200 transition"
          >
            Crear
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>

      {/* Lista */}
      <div className="bg-neutral-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Categorías existentes</h2>
        {categories.length === 0 ? (
          <p className="text-neutral-400 text-sm">No hay categorías todavía.</p>
        ) : (
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex justify-between items-center bg-neutral-700 px-4 py-3 rounded"
              >
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-neutral-400">/categoria/{cat.slug}</p>
                </div>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="text-red-400 hover:text-red-300 text-sm transition"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminCategories
