import { useEffect } from "react";

interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

function Lightbox({ imageUrl, onClose }: LightboxProps) {

  // Cerrar con tecla ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);

    // Bloquear scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt=""
        className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-xl transform scale-95 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute top-6 right-6 text-white text-3xl hover:opacity-70 transition"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}

export default Lightbox;