import { useState } from "react";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

/**
 * Renders a photo of her. If the image referenced in /public/images
 * doesn't exist yet, this quietly falls back to an elegant placeholder
 * frame instead of showing a broken-image icon — so the site still
 * looks finished before you've added real photos.
 *
 * style: "polaroid" | "taped" | "full" | "plain"
 */
export default function Photo({
  src,
  alt = "",
  caption,
  style = "plain",
  rotate = 0,
  className = "",
  revealDelay = 0,
}) {
  const [failed, setFailed] = useState(false);

  const frame = {
    polaroid: "bg-ivory p-3 pb-10 paper-shadow",
    taped: "bg-ivory p-2 paper-shadow",
    full: "",
    plain: "paper-shadow",
  }[style];

  return (
    <motion.figure
      className={`relative ${frame} ${className}`}
      style={{ rotate: `${rotate}deg` }}
      initial={{ opacity: 0, y: 24, rotate: rotate - 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, delay: revealDelay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.015 }}
    >
      {style === "taped" && (
        <span
          className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2"
          aria-hidden="true"
        />
      )}

      <div className="relative overflow-hidden bg-parchment aspect-[4/5] w-full">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-blush via-parchment to-rose/40 text-ink-soft">
            <Flower2 size={28} strokeWidth={1} className="opacity-60" />
            <span className="font-hand text-lg opacity-70 px-4 text-center">
              her photo goes here
            </span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="font-hand text-burgundy/80 text-xl mt-2 text-center px-2">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
