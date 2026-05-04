import { useEffect, useState } from "react"
import { fetchActiveCarouselImages } from "../../services/carouselService"
import type { CarouselImageDto } from "../../services/carouselService"

const WA_URL = `https://wa.me/5493416878831?text=${encodeURIComponent("Hola CN Carpintería 👋 Me gustaría consultar.")}`

const FALLBACK_SLIDES = [
  { type: "gradient" as const, style: "linear-gradient(135deg, #1A0E0A 0%, #2C1810 55%, #3D2218 100%)" },
  { type: "gradient" as const, style: "linear-gradient(160deg, #2C1810 0%, #4A2E22 50%, #C9A96E18 100%)" },
]

type Slide =
  | { type: "image"; src: string }
  | { type: "gradient"; style: string }

function Hero() {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetchActiveCarouselImages()
      .then((images: CarouselImageDto[]) => {
        if (images.length > 0) {
          setSlides(images.map((img) => ({ type: "image" as const, src: img.imageUrl })))
        }
      })
      .catch(() => { /* mantener fallback */ })
  }, [])

  useEffect(() => {
    setCurrent(0)
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides])

  return (
    <section className="py-10 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-[480px] overflow-hidden">

          {/* Slides */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt=""
                  className="w-full h-full object-cover animate-kenBurns"
                />
              ) : (
                <div className="w-full h-full" style={{ background: slide.style }} />
              )}
              <div className="absolute inset-0 bg-brown-dark/60" />
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
            <p
              className="text-gold tracking-[0.35em] text-xs uppercase mb-6 animate-slideUp"
              style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
            >
              Artesanía · Calidad · Diseño
            </p>

            <h1
              className="font-serif text-4xl md:text-6xl font-medium leading-[1.1] mb-5 animate-slideUp"
              style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
            >
              Muebles a medida,
              <br />
              <em className="text-gold not-italic">hechos para vos</em>
            </h1>

            <p
              className="text-white/65 text-base md:text-lg max-w-xl mb-9 font-light leading-relaxed animate-slideUp"
              style={{ animationDelay: "0.45s", opacity: 0, animationFillMode: "forwards" }}
            >
              Fabricamos cada proyecto con materiales premium y terminaciones
              de detalle, adaptados a tu espacio y estilo de vida.
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center gap-3 animate-slideUp"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              <a
                href="/#categorias"
                className="bg-gold text-brown-dark px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-300"
              >
                Ver trabajos
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 text-white/85 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300"
              >
                Consultanos
              </a>
            </div>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-gold" : "w-3 bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
