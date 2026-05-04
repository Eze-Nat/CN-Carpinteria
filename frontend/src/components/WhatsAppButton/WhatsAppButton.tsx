const WA_URL = `https://wa.me/5493416878831?text=${encodeURIComponent("Hola CN Carpintería 👋 Me gustaría consultar.")}`

function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/30 hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M19.11 17.57c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.14-1.24-.46-2.36-1.47-.87-.78-1.45-1.75-1.62-2.04-.17-.29-.02-.45.12-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.87-2.12-.23-.55-.46-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.8 1.17 2.99c.14.19 2.02 3.09 4.9 4.33.69.3 1.22.48 1.64.62.69.22 1.31.19 1.81.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33zM16 3C9.38 3 4 8.38 4 15c0 2.65.86 5.1 2.33 7.08L4 29l7.1-2.27C13.9 27.57 14.93 28 16 28c6.62 0 12-5.38 12-12S22.62 3 16 3z" />
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
      </div>
    </a>
  )
}

export default WhatsAppButton
