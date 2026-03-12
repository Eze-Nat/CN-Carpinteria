
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden">
      
      {/* Marca de agua       <img
        src={completoBlanco}
        alt="Marca de agua"
        className="absolute w-[600px] md:w-[900px] opacity-5"
      /> */}


      {/* Contenido */}
      <div className="relative z-10 max-w-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Fabricamos muebles a medida
          <span className="block text-neutral-300 mt-2">
            con calidad y precisión
          </span>
        </h1>

        <p className="mt-6 text-neutral-300 text-lg">
          Diseño, producción e instalación profesional.
          Cada proyecto es único.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a 
            href="#gallery"
            className="bg-white text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Ver trabajos
          </a>

          <button className="border border-neutral-300 px-6 py-3 rounded-md hover:bg-white/10 transition">
            Contactar
          </button>
        </div>
      </div>

    </section>
  )
}

export default Hero