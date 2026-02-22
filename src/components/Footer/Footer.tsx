function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-6">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} CN Carpintería. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer