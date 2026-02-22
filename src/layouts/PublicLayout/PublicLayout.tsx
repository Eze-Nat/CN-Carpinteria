import { ReactNode } from "react"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";

interface PublicLayoutProps {
  children: ReactNode
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default PublicLayout