import type { ReactNode } from "react"
import PromoBar from "../../components/PromoBar/PromoBar"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton"

// PromoBar: h-10 (40px) fixed top-0
// Navbar:   top-10, h-[74px] fixed
// Total header: 40 + 74 = 114px → pt-[114px]

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-cream text-brown-dark font-sans">
      <PromoBar />
      <Navbar />
      <main className="pt-[114px]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default PublicLayout
