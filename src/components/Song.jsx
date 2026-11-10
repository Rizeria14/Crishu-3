import { useState } from "react";
import { motion } from "framer-motion";

/**
 * One entry in "Songs That Remind Me of You" — album art doubles as
 * a vinyl record that spins gently on hover, and clicking opens the
 * song's Spotify/YouTube link if one is provided.
 */
export default function Song({ title, artist, art, note, link, index = 0 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const Wrapper = link ? "a" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Wrapper
        href={link}
        target={link ? "_blank" : undefined}
        rel={link ? "noreferrer" : undefined}
        className="flex items-center gap-5 py-5 border-b border-burgundy/10 last:border-none cursor-pointer"
      >
        <div className="relative h-16 w-16 shrink-0">
          {/* vinyl disc peeking out behind the sleeve */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-ink transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:rotate-180">
            <div className="absolute inset-[38%] rounded-full bg-blush" />
            <div className="absolute inset-0 rounded-full border border-ivory/10" />
          </div>
          {/* album sleeve */}
          <div className="relative h-16 w-16 overflow-hidden bg-parchment paper-shadow">
            {!imgFailed ? (
              <img
                src={art}
                alt={`${title} album art`}
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blush to-dusty-rose/60" />
            )}
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-display italic text-2xl text-ink truncate">{title}</p>
          <p className="font-body text-sm text-ink-soft/80 mb-1.5">{artist}</p>
          <p className="font-hand text-lg text-burgundy/75 leading-snug">{note}</p>
        </div>
      </Wrapper>
    </motion.div>
  );
}
