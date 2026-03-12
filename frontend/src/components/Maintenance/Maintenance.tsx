export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-6">
      <div className="text-center max-w-xl">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          CN Carpintería
        </h1>

        <p className="text-neutral-300 text-lg mb-4">
          Estamos renovando nuestra página web.
        </p>

        <p className="text-neutral-400">
          Muy pronto podrás ver todos nuestros trabajos y proyectos.
        </p>

        <a
          href="https://wa.me/5493416878831"
          className="inline-block mt-8 bg-white text-black px-6 py-3 rounded-md font-medium hover:opacity-90"
        >
          Contactar por WhatsApp
        </a>

      </div>
    </div>
  )
}