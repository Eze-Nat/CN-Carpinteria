import logoBlanco from "../../assets/images/transparente-Completo-Blanco.png"

const WA_URL = `https://wa.me/5493416878831?text=${encodeURIComponent("Hola CN Carpintería 👋 Me gustaría consultar.")}`
const IG_URL = "https://www.instagram.com/cncarpinteria"

function Footer() {
  return (
    <footer className="bg-brown-dark text-white/60 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <img src={logoBlanco} alt="CN Carpintería" className="h-10 w-auto mb-5 opacity-85" />
          <p className="text-sm text-white/35 leading-relaxed max-w-xs">
            Fabricamos muebles a medida con calidad artesanal y materiales
            premium. Rosario, Argentina.
          </p>
        </div>

        {/* Nav */}
        <div>
          <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-medium">
            Navegación
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Inicio", href: "/" },
              { label: "Trabajos", href: "/#categorias" },
              { label: "Nosotros", href: "/#nosotros" },
              { label: "Instagram", href: IG_URL, external: true },
              { label: "Contacto", href: WA_URL, external: true },
            ].map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="hover:text-white transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-medium">
            Contacto
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M19.11 17.57c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.14-1.24-.46-2.36-1.47-.87-.78-1.45-1.75-1.62-2.04-.17-.29-.02-.45.12-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.87-2.12-.23-.55-.46-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.8 1.17 2.99c.14.19 2.02 3.09 4.9 4.33.69.3 1.22.48 1.64.62.69.22 1.31.19 1.81.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33zM16 3C9.38 3 4 8.38 4 15c0 2.65.86 5.1 2.33 7.08L4 29l7.1-2.27C13.9 27.57 14.93 28 16 28c6.62 0 12-5.38 12-12S22.62 3 16 3z" />
                </svg>
                +54 9 341 687-8831
              </a>
            </li>
            <li>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-pink-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @cncarpinteria
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 px-6">
        <p className="text-center text-xs text-white/25 tracking-widest">
          © {new Date().getFullYear()} CN Carpintería &mdash; Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}

export default Footer
