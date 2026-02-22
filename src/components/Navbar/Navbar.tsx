import { useEffect, useState } from "react"
import logoBlanco from "../../assets/images/cn-blanco.png"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={logoBlanco}
            alt="CN Carpintería Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="space-x-6 text-sm text-neutral-300">
          <a href="#" className="hover:text-white transition">
            Inicio
          </a>
          <a href="#gallery" className="hover:text-white transition">
            Galería
          </a>
          <a href="#" className="hover:text-white transition">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar