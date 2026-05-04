const WA_URL = `https://wa.me/5493416878831?text=${encodeURIComponent("Hola CN Carpintería 👋 Me gustaría hablar de un proyecto.")}`

function AboutSection() {
  return (
    <section id="nosotros" className="py-24 md:py-36 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Image with decorative frame */}
        <div className="relative">
          <div className="absolute -top-5 -left-5 w-full h-full border border-gold/30 pointer-events-none" />
          <img
            src="/images/localjugueteria1.jpg"
            alt="Taller CN Carpintería"
            className="w-full h-[480px] md:h-[540px] object-cover relative z-10"
          />
          <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-gold/10 border border-gold/30 pointer-events-none" />
        </div>

        {/* Text */}
        <div>
          <p className="text-gold tracking-[0.35em] text-xs uppercase mb-5 font-medium">
            Quiénes somos
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-brown leading-[1.15] mb-6">
            Carpintería a medida
            <br />
            <em className="text-gold not-italic">desde 2017</em>
          </h2>
          <div className="w-10 h-px bg-gold mb-8" />
          <p className="text-brown-light text-base md:text-lg leading-relaxed mb-5">
            En CN Carpintería fabricamos muebles a medida para hogares y espacios
            comerciales en Rosario. Trabajamos principalmente con melamina de primera
            calidad, herrajes de primera calidad y acabados de detalle que garantizan
            durabilidad y estética en cada pieza.
          </p>
          <p className="text-brown-light text-base md:text-lg leading-relaxed mb-10">
            Cada proyecto es diseñado, producido e instalado por nuestro equipo —
            desde el primer boceto hasta la entrega final.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-brown text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-brown-light transition-all duration-300"
            >
              Hablemos de tu proyecto
            </a>
            <a
              href="/#categorias"
              className="inline-flex items-center justify-center border border-brown/30 text-brown px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:border-brown hover:bg-brown/5 transition-all duration-300"
            >
              Ver trabajos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
