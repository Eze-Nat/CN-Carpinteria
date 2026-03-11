function StandardFurniture() {
  return (
    <section className="py-24 bg-woodBg bg-opacity-60 rounded-lg" >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Imagen */}
        <div>
          <img
            src="/images/localjugueteria1.jpg"
            alt="Muebles estándar"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Texto */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-text-main">
            Muebles Estándar
          </h2>

          <p className="text-lg mb-6 text-neutral-700">
            Además de muebles a medida, ofrecemos una línea de muebles estándar
            diseñados para adaptarse a distintos espacios con excelente calidad
            y terminaciones.
          </p>

          <p className="text-lg mb-8 text-neutral-700">
            Son ideales para quienes buscan una solución rápida, funcional y
            con el diseño característico de nuestra carpintería.
          </p>

          <button className="bg-wood text-white px-6 py-3 rounded-lg hover:bg-woodLight transition">
            Ver modelos
          </button>
        </div>

      </div>
    </section>

  )
}

export default StandardFurniture