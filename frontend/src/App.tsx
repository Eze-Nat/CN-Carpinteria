import { Routes, Route } from "react-router-dom"

/* Layouts */
import PublicLayout from "./layouts/PublicLayout/PublicLayout"
import AdminLayout from "./layouts/AdminLayout/AdminLayout"

/* Route Guard */
import ProtectedRoute from "./routes/ProtectedRoute"

/* Public Pages */
import Home from "./pages/Home/Home"
import CategoryPage from "./pages/Category/CategoryPage"

/* Admin Pages */
import AdminLogin from "./pages/Admin/AdminLogin"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AdminCategories from "./pages/Admin/AdminCategories"
import AdminImages from "./pages/Admin/AdminImages"
import AdminReels from "./pages/Admin/AdminReels"
import AdminProjects from "./pages/Admin/AdminProjects"
import AdminCarousel from "./pages/Admin/AdminCarousel"
import Maintenance from "./components/Maintenance/Maintenance"

function App() {
  const maintenance = import.meta.env.VITE_MAINTENANCE === "true"

  if (maintenance) {
    return <Maintenance />
  }

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/categoria/:slug"
        element={
          <PublicLayout>
            <CategoryPage />
          </PublicLayout>
        }
      />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categorias"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminCategories />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/imagenes"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminImages />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/carousel"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminCarousel />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/proyectos"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminProjects />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reels"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminReels />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
