"use client";

import { useEffect, useState } from "react";

type ExpandableImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

export default function ExpandableImage({
  src,
  alt,
  caption,
}: ExpandableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Enlarge image"
        className="group relative flex aspect-square w-full items-center justify-center overflow-hidden border border-rule bg-paper"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized */}
        <img src={src} alt={alt} className="h-full w-full object-contain" />
        <span className="absolute bottom-3 right-3 rounded-full bg-ink px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-paper opacity-90 transition-opacity group-hover:opacity-100">
          Click to enlarge
        </span>
      </button>

      {caption ? <p className="mt-3 text-xs text-muted">{caption}</p> : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-6"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute inset-0 h-full w-full cursor-zoom-out"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-label absolute right-6 top-6 z-10 uppercase tracking-[0.12em] text-paper hover:text-accent"
          >
            Close &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized */}
          <img
            src={src}
            alt={alt}
            className="relative z-10 max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
