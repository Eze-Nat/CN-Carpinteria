

import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton"

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">

      {/* Fondo blurreado */}
<div className="fixed inset-0 -z-10 opacity-90">
  <img
    src="/images/localjugueteria1.jpg"
    alt="background"
    className="w-full h-full object-cover brightness-40"
  />
</div>


      {/* Navbar */}
      <Navbar />

      {/* Contenido */}
      <main className="flex-1">
        {children}
        
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp */}
      <WhatsAppButton />

    </div>
  )
}

export default PublicLayout