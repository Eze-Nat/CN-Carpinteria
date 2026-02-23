import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { fetchCategories } from "../../services/categoryService";
import type { CategoryDto } from "../../services/categoryService";


function Home() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las categorías");
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading)
    return <p className="text-center mt-20">Cargando categorías...</p>;

  if (error)
    return (
      <p className="text-center mt-20 text-red-500">
        {error}
      </p>
    );

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
  );
}

export default Home;