import { useState } from "react"
import logoCompleto from "../../assets/images/Completo-blanco.png"

const WA_URL = `https://wa.me/5493416878831?text=${encodeURIComponent("Hola CN Carpintería 👋 Me gustaría consultar.")}`

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed left-0 right-0 z-40 top-10 shadow-md"
      style={{ backgroundColor: "#2C1810" }}
    >
      {/* Main bar — altura fija 74px */}
      <div className="max-w-7xl mx-auto px-6 h-[74px] flex justify-between items-center">

        {/* Logo */}
        <a href="/" aria-label="CN Carpintería – Inicio" className="flex items-center">
          <img
            src={logoCompleto}
            alt="CN Carpintería"
            style={{ height: "50px", width: "auto" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase">
          <a href="/#categorias" className="text-cream hover:text-gold transition-colors duration-200">
            Trabajos
          </a>
          <a href="/#nosotros" className="text-cream hover:text-gold transition-colors duration-200">
            Nosotros
          </a>
          <a href="/#reels" className="text-cream hover:text-gold transition-colors duration-200">
            Instagram
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold text-gold px-5 py-2.5 hover:bg-gold hover:text-brown transition-all duration-300"
          >
            Contacto
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream hover:text-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown — mismo fondo */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-white/10 px-6 py-6 flex flex-col gap-5 text-xs font-medium tracking-[0.2em] uppercase"
          style={{ backgroundColor: "#2C1810" }}
        >
          <a href="/#categorias" onClick={() => setMenuOpen(false)} className="text-cream hover:text-gold transition-colors">
            Trabajos
          </a>
          <a href="/#nosotros" onClick={() => setMenuOpen(false)} className="text-cream hover:text-gold transition-colors">
            Nosotros
          </a>
          <a href="/#reels" onClick={() => setMenuOpen(false)} className="text-cream hover:text-gold transition-colors">
            Instagram
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="border border-gold text-gold px-5 py-3 text-center hover:bg-gold hover:text-brown transition-all duration-300"
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
