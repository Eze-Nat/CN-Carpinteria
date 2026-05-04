import { useEffect, useState } from "react"
import Hero from "../../components/Hero/Hero"
import StandardBanner from "../../components/StandardBanner/StandardBanner"
import CategoryCard from "../../components/CategoryCard/CategoryCard"
import AboutSection from "../../components/AboutSection/AboutSection"
import ReelsSection from "../../components/ReelsSection/ReelsSection"
import { fetchCategories } from "../../services/categoryService"
import type { CategoryDto } from "../../services/categoryService"
import { fetchProjects } from "../../services/projectService"
import type { ProjectDto } from "../../services/projectService"

function Home() {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [projects, setProjects] = useState<ProjectDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [cats, projs] = await Promise.all([fetchCategories(), fetchProjects()])
        setCategories(cats)
        setProjects(projs)
      } catch (err) {
        console.error("Error cargando datos:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function getCoverImage(categoryId: string): string | undefined {
    return projects.find((p) => p.categoryId === categoryId)?.coverImageUrl
  }

  return (
    <>
      <Hero />

      <StandardBanner />

      {/* Categorías */}
      <section id="categorias" className="py-24 md:py-36 bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.35em] text-xs uppercase mb-4 font-medium">
              Nuestro trabajo
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-brown">
              Cada pieza, única
            </h2>
            <div className="w-10 h-px bg-gold mx-auto mt-6" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-woodSoft animate-pulse rounded-sm" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-brown-light/50 py-12">
              Aún no hay categorías creadas.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, i) => (
                <CategoryCard
                  key={cat.id}
                  title={cat.name}
                  slug={cat.slug}
                  coverImage={getCoverImage(cat.id)}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AboutSection />

      <ReelsSection />
    </>
  )
}

export default Home
