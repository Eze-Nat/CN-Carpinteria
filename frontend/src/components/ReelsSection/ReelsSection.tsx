import { useEffect, useState } from "react"
import { fetchReels } from "../../services/reelService"
import type { ReelApiItem } from "../../services/reelService"

const INSTAGRAM_URL = "https://www.instagram.com/cncarpinteria"

function ReelsSection() {
  const [reels, setReels] = useState<ReelApiItem[]>([])
  const [playing, setPlaying] = useState<ReelApiItem | null>(null)

  useEffect(() => {
    fetchReels().then(setReels).catch(console.error)
  }, [])

  return (
    <section id="reels" className="py-24 md:py-32 bg-brown-dark">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold tracking-[0.35em] text-xs uppercase mb-4 font-medium">
            Instagram
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-3">
            Seguinos en Instagram
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 text-sm tracking-widest hover:text-gold transition-colors duration-200"
          >
            @cncarpinteria
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {reels.length > 0
            ? reels.slice(0, 6).map((reel) => (
                <button
                  key={reel.id}
                  onClick={() => setPlaying(reel)}
                  className="group relative aspect-square overflow-hidden bg-brown-light text-left"
                >
                  {reel.thumbnailUrl ? (
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, #2C1810 0%, #4A2E22 100%)",
                      }}
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-brown-dark/20 group-hover:bg-brown-dark/40 transition-colors duration-300" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/30 border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/70 group-hover:bg-black/50 transition-all duration-300">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-brown-dark/80 to-transparent">
                    <p className="text-white/90 text-xs truncate">{reel.title}</p>
                  </div>
                </button>
              ))
            : /* Placeholder grid when no reels yet */
              [1, 2, 3, 4, 5, 6].map((n) => (
                <a
                  key={n}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${135 + n * 20}deg, #2C1810 0%, #4A2E22 60%, #C9A96E14 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/25 border border-white/25 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/60 transition-all duration-300">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-gold/40 text-gold px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Ver todo en Instagram
          </a>
        </div>
      </div>

      {/* Video modal */}
      {playing && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <video
            src={playing.videoUrl}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl transition-colors"
            onClick={() => setPlaying(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase">
            {playing.title}
          </p>
        </div>
      )}
    </section>
  )
}

export default ReelsSection
