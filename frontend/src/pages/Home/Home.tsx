import { useState } from "react"
import Hero from "../../components/Hero/Hero"
import CategoryCard from "../../components/CategoryCard/CategoryCard"
import type { Category } from "../../types/Category"
import { getStoredCategories } from "../../utils/categoryStorage"

function Home() {
const [categories] = useState<Category[]>(() => {
  return getStoredCategories()
})



  return (
    <>
      <Hero />

      <section id="gallery" className="py-24 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Nuestros trabajos
          </h2>

          {categories.length === 0 ? (
            <p className="text-center text-neutral-500">
              Aún no hay categorías creadas.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.name}
                  slug={category.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Home