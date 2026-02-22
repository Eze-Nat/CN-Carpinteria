import { useEffect, useState } from "react"
import type { Category } from "../../types/Category"

function AdminCategories() {
const [categories, setCategories] = useState<Category[]>(() => {
  const stored = localStorage.getItem("categories")
  return stored ? JSON.parse(stored) : []
})
  const [newCategoryName, setNewCategoryName] = useState("")



  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])
  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
  }

  function handleAddCategory() {
    if (!newCategoryName.trim()) return

    const newCategory: Category = {
      id: Date.now(),
      name: newCategoryName,
      slug: generateSlug(newCategoryName),
    }

    setCategories([...categories, newCategory])
    setNewCategoryName("")
  }

  function handleDelete(id: number) {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Gestión de Categorías
      </h1>

      {/* Formulario */}
      <div className="bg-neutral-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Nueva Categoría
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-neutral-700 border border-neutral-600 focus:outline-none focus:border-white"
          />

          <button
            onClick={handleAddCategory}
            className="bg-white text-black px-6 py-2 rounded font-medium hover:opacity-90 transition"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="bg-neutral-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Categorías existentes
        </h2>

        <ul className="space-y-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between items-center bg-neutral-700 px-4 py-3 rounded"
            >
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-sm text-neutral-400">
                  /categoria/{cat.slug}
                </p>
              </div>

              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminCategories