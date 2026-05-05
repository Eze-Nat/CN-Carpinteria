import { Link } from "react-router-dom"

interface CategoryCardProps {
  title: string
  slug: string
  coverImage?: string
  index?: number
}

const fallbackGradients = [
  "linear-gradient(145deg, #1A0E0A 0%, #2C1810 100%)",
  "linear-gradient(145deg, #2C1810 0%, #4A2E22 100%)",
  "linear-gradient(145deg, #3D2218 0%, #2C1810 100%)",
  "linear-gradient(145deg, #1A0E0A 0%, #3D2218 100%)",
]

function CategoryCard({ title, slug, coverImage, index = 0 }: CategoryCardProps) {
  return (
    <Link to={`/categoria/${slug}`} className="group block relative overflow-hidden aspect-[4/3]">
      {/* Background */}
      {coverImage ? (
        <img
          src={coverImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: fallbackGradients[index % fallbackGradients.length] }}
        />
      )}

      {/* Gradient overlay — bottom shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/20 to-transparent" />

      {/* Gold border on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-gold/60 transition-all duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="w-6 h-px bg-gold mb-3 group-hover:w-14 transition-all duration-500" />
        <h3 className="font-serif text-xl md:text-2xl text-white font-medium tracking-wide leading-snug">
          {title}
        </h3>
        <p className="text-gold text-xs tracking-[0.2em] uppercase mt-2.5 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 font-medium">
          Ver galería →
        </p>
      </div>
    </Link>
  )
}

export default CategoryCard
