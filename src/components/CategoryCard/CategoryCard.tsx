import { Link } from "react-router-dom"

interface CategoryCardProps {
  title: string
  slug: string
}

function CategoryCard({ title, slug }: CategoryCardProps) {
  return (
    <Link to={`/categoria/${slug}`}>
      <div className="relative group h-64 md:h-80 rounded-xl overflow-hidden cursor-pointer">
        
        {/* Fondo */}
        <div className="absolute inset-0 bg-neutral-800 group-hover:scale-110 transition-transform duration-500" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition" />

        {/* Texto */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-wide">
            {title}
          </h3>
        </div>

      </div>
    </Link>
  )
}

export default CategoryCard