import { useEffect, useState } from "react";
import { fetchCategories, createCategory } from "../../services/categoryService";
import type { CategoryDto } from "../../services/categoryService";

function AdminCategories() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCategory() {
    if (!newCategoryName.trim()) return;

    try {
      await createCategory(newCategoryName);
      setNewCategoryName("");
      await loadCategories();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Gestión de Categorías
      </h1>

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
            className="flex-1 px-4 py-2 rounded bg-neutral-700 border border-neutral-600"
          />

          <button
            onClick={handleAddCategory}
            className="bg-white text-black px-6 py-2 rounded"
          >
            Crear
          </button>
        </div>
      </div>

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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminCategories;