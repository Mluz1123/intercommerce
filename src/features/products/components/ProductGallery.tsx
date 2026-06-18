import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-card bg-surface ring-1 ring-black/5">
        {main && (
          <img
            src={main}
            alt={title}
            className="h-full w-full object-contain p-6"
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-pressed={i === active}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 transition-shadow ${
                i === active
                  ? "ring-2 ring-accent"
                  : "ring-black/5 hover:ring-black/20"
              }`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
