const WA_URL = `https://wa.me/5493416878831?text=${encodeURIComponent("Hola CN Carpintería 👋 Quiero consultar sobre los muebles estándar.")}`

function PromoBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-center bg-brown text-gold-light text-xs md:text-sm font-medium tracking-wide">
      🪵 ¡Ya disponibles nuestros muebles estándar! Consultanos por{" "}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 underline underline-offset-2 hover:text-white transition-colors duration-200"
      >
        WhatsApp
      </a>
    </div>
  )
}

export default PromoBar
