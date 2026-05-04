import { useEffect, useRef, useState } from "react"
import { fetchCategories } from "../../services/categoryService"
import type { CategoryDto } from "../../services/categoryService"
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  fetchProjectById,
  addProjectImage,
  deleteProjectImage,
} from "../../services/projectService"
import type { ProjectDto, ProjectDetailDto } from "../../services/projectService"

type View = "list" | "new" | "detail"

function AdminProjects() {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [projects, setProjects] = useState<ProjectDto[]>([])
  const [view, setView] = useState<View>("list")
  const [selectedProject, setSelectedProject] = useState<ProjectDetailDto | null>(null)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)

  // New project form
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const coverFileRef = useRef<HTMLInputElement>(null)

  // Add image to project
  const imageFileRef = useRef<HTMLInputElement>(null)
  const [addingImage, setAddingImage] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const [cats, projs] = await Promise.all([fetchCategories(), fetchProjects()])
      setCategories(cats)
      setProjects(projs)
      if (cats.length > 0) setCategoryId((prev) => prev || cats[0].id)
    } catch {
      setError("Error cargando datos.")
    }
  }

  async function handleCreate() {
    if (!name.trim() || !categoryId) {
      setError("Nombre y categoría son obligatorios.")
      return
    }

    setError("")
    setUploading(true)
    try {
      await createProject({
        name: name.trim(),
        description: description.trim(),
        categoryId,
        coverImage: coverFileRef.current?.files?.[0],
      })
      setName("")
      setDescription("")
      if (coverFileRef.current) coverFileRef.current.value = ""
      setView("list")
      await load()
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      setError(`Error al crear el proyecto: ${msg}`)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este proyecto y todas sus imágenes?")) return
    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      if (selectedProject?.id === id) {
        setSelectedProject(null)
        setView("list")
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      setError(`Error al eliminar: ${msg}`)
    }
  }

  async function openProject(id: string) {
    setError("")
    try {
      const detail = await fetchProjectById(id)
      setSelectedProject(detail)
      setView("detail")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      setError(`Error al cargar proyecto: ${msg}`)
    }
  }

  async function handleAddImage() {
    const file = imageFileRef.current?.files?.[0]
    if (!file || !selectedProject) return

    setAddingImage(true)
    setError("")
    try {
      const nextOrder = selectedProject.images?.length ?? 0
      const newImg = await addProjectImage(selectedProject.id, file, nextOrder)

      // Si no tenía portada, usar esta imagen como portada automáticamente
      const isFirstImage = !selectedProject.coverImageUrl && nextOrder === 0
      if (isFirstImage) {
        await updateProject(selectedProject.id, {
          name: selectedProject.name,
          description: selectedProject.description,
          coverImageUrl: newImg.imageUrl,
        })
        setSelectedProject((prev) =>
          prev ? { ...prev, coverImageUrl: newImg.imageUrl, images: [...(prev.images ?? []), newImg] } : prev
        )
        // Refrescar lista para que la card muestre la nueva portada
        setProjects((prev) =>
          prev.map((p) => p.id === selectedProject.id ? { ...p, coverImageUrl: newImg.imageUrl } : p)
        )
      } else {
        setSelectedProject((prev) =>
          prev ? { ...prev, images: [...(prev.images ?? []), newImg] } : prev
        )
      }

      if (imageFileRef.current) imageFileRef.current.value = ""
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      setError(`Error al subir imagen: ${msg}`)
    } finally {
      setAddingImage(false)
    }
  }

  async function handleDeleteImage(imageId: string) {
    if (!confirm("¿Eliminar esta imagen?")) return
    try {
      await deleteProjectImage(imageId)
      setSelectedProject((prev) =>
        prev ? { ...prev, images: prev.images.filter((i) => i.id !== imageId) } : prev
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      setError(`Error al eliminar imagen: ${msg}`)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {view === "list" && "Gestión de Proyectos"}
          {view === "new" && "Nuevo Proyecto"}
          {view === "detail" && selectedProject?.name}
        </h1>
        <div className="flex gap-3">
          {view !== "list" && (
            <button
              onClick={() => { setView("list"); setError("") }}
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              ← Volver
            </button>
          )}
          {view === "list" && (
            <button
              onClick={() => { setView("new"); setError("") }}
              className="bg-white text-black px-5 py-2 rounded text-sm font-medium hover:bg-neutral-200 transition"
            >
              + Nuevo proyecto
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 text-sm px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* ── List ── */}
      {view === "list" && (
        <>
          {projects.length === 0 ? (
            <p className="text-neutral-400">No hay proyectos todavía.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="bg-neutral-800 rounded-lg overflow-hidden">
                  {p.coverImageUrl ? (
                    <img src={p.coverImageUrl} alt={p.name} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-neutral-700 flex items-center justify-center text-neutral-500 text-sm">
                      Sin portada
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-medium text-white truncate">{p.name}</p>
                    <p className="text-xs text-neutral-400 mt-1">{p.categoryName}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => openProject(p.id)}
                        className="flex-1 text-xs bg-neutral-700 hover:bg-neutral-600 py-1.5 rounded transition"
                      >
                        Ver / Editar imágenes
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition px-2"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── New project form ── */}
      {view === "new" && (
        <div className="bg-neutral-800 p-6 rounded-lg max-w-xl space-y-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Categoría</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600 text-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Nombre del proyecto</label>
            <input
              type="text"
              placeholder="Ej: Placard dormitorio principal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600 text-white placeholder:text-neutral-400"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Descripción (opcional)</label>
            <textarea
              placeholder="Breve descripción del trabajo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600 text-white placeholder:text-neutral-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">
              Imagen de portada{" "}
              <span className="text-neutral-500 text-xs">(opcional — se usa la primera imagen si no elegís)</span>
            </label>
            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 rounded bg-neutral-700 border border-neutral-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-neutral-600 file:text-white text-white"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={uploading}
            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {uploading ? "Creando..." : "Crear proyecto"}
          </button>
        </div>
      )}

      {/* ── Project detail / images ── */}
      {view === "detail" && selectedProject && (
        <div>
          <div className="flex gap-6 mb-8">
            {selectedProject.coverImageUrl ? (
              <img
                src={selectedProject.coverImageUrl}
                alt={selectedProject.name}
                className="w-40 h-28 object-cover rounded-lg shrink-0"
              />
            ) : (
              <div className="w-40 h-28 bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-500 text-xs shrink-0">
                Sin portada
              </div>
            )}
            <div>
              <p className="text-neutral-400 text-sm">{selectedProject.categoryName}</p>
              {selectedProject.description && (
                <p className="text-neutral-300 text-sm mt-1">{selectedProject.description}</p>
              )}
              {!selectedProject.coverImageUrl && (
                <p className="text-yellow-500 text-xs mt-2">
                  La primera imagen que agregues se usará como portada automáticamente.
                </p>
              )}
            </div>
          </div>

          {/* Add image */}
          <div className="bg-neutral-800 p-4 rounded-lg mb-6 flex items-center gap-4">
            <input
              ref={imageFileRef}
              type="file"
              accept="image/*"
              className="flex-1 px-3 py-1.5 rounded bg-neutral-700 border border-neutral-600 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:bg-neutral-600 file:text-white text-white text-sm"
            />
            <button
              onClick={handleAddImage}
              disabled={addingImage}
              className="bg-white text-black px-4 py-1.5 rounded text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50 shrink-0"
            >
              {addingImage ? "Subiendo..." : "Agregar imagen"}
            </button>
          </div>

          {/* Images grid */}
          {selectedProject.images.length === 0 ? (
            <p className="text-neutral-400 text-sm">Sin imágenes todavía. Agregá la primera.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {selectedProject.images
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((img, i) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.imageUrl}
                      alt=""
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    {i === 0 && selectedProject.coverImageUrl === img.imageUrl && (
                      <span className="absolute top-1 left-1 bg-gold text-brown text-xs px-1.5 py-0.5 rounded font-medium">
                        Portada
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="absolute top-1 right-1 bg-black/60 text-red-400 hover:text-red-300 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminProjects
