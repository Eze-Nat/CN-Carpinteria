import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchCategories } from "../../services/categoryService"
import type { CategoryDto } from "../../services/categoryService"
import { fetchProjectsBySlug, fetchProjectById } from "../../services/projectService"
import type { ProjectDto, ProjectDetailDto } from "../../services/projectService"

function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [categoryName, setCategoryName] = useState("")
  const [projects, setProjects] = useState<ProjectDto[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ProjectDetailDto | null>(null)
  const [modalIndex, setModalIndex] = useState(0)
  const [loadingModal, setLoadingModal] = useState(false)

  useEffect(() => {
    async function load() {
      if (!slug) return
      try {
        const [cats, projs] = await Promise.all([
          fetchCategories(),
          fetchProjectsBySlug(slug),
        ])
        const cat = cats.find((c: CategoryDto) => c.slug === slug)
        if (cat) setCategoryName(cat.name)
        setProjects(projs)
      } catch (err) {
        console.error("Error cargando proyectos:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  async function openProject(id: string) {
    setLoadingModal(true)
    try {
      const detail = await fetchProjectById(id)
      setModal(detail)
      setModalIndex(0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingModal(false)
    }
  }

  function closeModal() {
    setModal(null)
    setModalIndex(0)
  }

  function prevImage() {
    if (!modal) return
    setModalIndex((i) => (i - 1 + modal.images.length) % modal.images.length)
  }

  function nextImage() {
    if (!modal) return
    setModalIndex((i) => (i + 1) % modal.images.length)
  }

  return (
    <>
      {/* Page header */}
      <div className="pt-36 pb-16 bg-brown-dark text-center">
        <p className="text-gold tracking-[0.35em] text-xs uppercase mb-4 font-medium">
          Categoría
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-white capitalize">
          {categoryName || slug}
        </h1>
      </div>

      {/* Projects grid */}
      <section className="py-16 bg-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-neutral-200 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-brown-light/50 mb-6">No hay proyectos en esta categoría aún.</p>
              <Link
                to="/"
                className="text-xs tracking-[0.2em] uppercase border border-brown/30 text-brown px-6 py-3 hover:bg-brown hover:text-white transition-all duration-300"
              >
                ← Volver al inicio
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openProject(project.id)}
                  disabled={loadingModal}
                  className="group relative overflow-hidden aspect-[4/3] text-left focus:outline-none"
                >
                  {project.coverImageUrl ? (
                    <img
                      src={project.coverImageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brown-light to-brown-dark" />
                  )}
                  <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brown-dark/90 via-brown-dark/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-sm leading-snug">{project.name}</p>
                    {project.description && (
                      <p className="text-white/60 text-xs mt-1 line-clamp-1">{project.description}</p>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-gold text-brown text-xs font-medium px-2 py-1">
                      Ver galería
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && (
            <div className="text-center mt-12">
              <Link
                to="/"
                className="text-xs tracking-[0.2em] uppercase text-brown/50 hover:text-brown transition-colors duration-200"
              >
                ← Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Project image modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <p className="text-white font-medium">{modal.name}</p>
                {modal.images.length > 0 && (
                  <p className="text-white/50 text-xs mt-0.5">
                    {modalIndex + 1} / {modal.images.length}
                  </p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white transition text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {modal.images.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-white/40 text-sm">
                Este proyecto no tiene imágenes.
              </div>
            ) : (
              <div className="relative">
                <img
                  src={modal.images[modalIndex].imageUrl}
                  alt={modal.name}
                  className="w-full max-h-[75vh] object-contain"
                />

                {modal.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {modal.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {modal.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setModalIndex(i)}
                    className={`shrink-0 w-14 h-14 rounded overflow-hidden border-2 transition ${
                      i === modalIndex ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryPage
