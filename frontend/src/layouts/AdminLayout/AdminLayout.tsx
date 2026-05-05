import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

interface AdminLayoutProps {
  children: ReactNode
}

const navItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/carousel", label: "Carousel" },
  { to: "/admin/categorias", label: "Categorías" },
  { to: "/admin/proyectos", label: "Proyectos" },
  { to: "/admin/reels", label: "Reels" },
]

function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Panel Admin</h2>

        <nav className="space-y-1 flex-1">
          {navItems.map(({ to, label }) => {
            const active =
              to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2 rounded transition text-sm ${
                  active
                    ? "bg-neutral-800 text-white font-medium"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-neutral-800 hover:bg-neutral-700 transition py-2 rounded text-sm text-neutral-300"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  )
}

export default AdminLayout
