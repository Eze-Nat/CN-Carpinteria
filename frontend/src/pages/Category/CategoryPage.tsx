import { useState } from "react";
import { useParams } from "react-router-dom";
import type { ImageItem } from "../../types/Image";
import { getStoredImages } from "../../utils/imageStorage";
import Lightbox from "../../components/Lightbox/Lightbox";

function CategoryPage() {
  const { slug } = useParams();

  const [images] = useState<ImageItem[]>((() => {
    return getStoredImages();
  }));

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = images.filter(
    (img) => img.categorySlug === slug
  );

  return (
    <>
      <section className="py-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 capitalize">
            {slug}
          </h2>

          {filteredImages.length === 0 ? (
            <p className="text-neutral-500">
              No hay imágenes en esta categoría aún.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  className="overflow-hidden rounded-lg group cursor-pointer"
                  onClick={() => setSelectedImage(img.url)}
                >
                  <img
                    src={img.url}
                    alt={img.description || ""}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <Lightbox
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

export default CategoryPage;