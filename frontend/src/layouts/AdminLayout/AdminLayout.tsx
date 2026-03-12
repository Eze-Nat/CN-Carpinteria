import type { ReactNode } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }
  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800 p-6">
        <h2 className="text-xl font-bold mb-8">Panel Admin</h2>

        <nav className="space-y-4 text-neutral-300">
          <Link to="/admin" className="block hover:text-white transition">
            Dashboard
          </Link>
          <Link
            to="/admin/categorias"
            className="block hover:text-white transition"
          >
            Categorías
          </Link>
          <Link
            to="/admin/imagenes"
            className="block hover:text-white transition"
          >
            Imágenes
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-neutral-800 hover:bg-neutral-700 transition py-2 rounded"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}

export default AdminLayout;
