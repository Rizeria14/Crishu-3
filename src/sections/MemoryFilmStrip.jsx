import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Song from "../components/Song.jsx";
import SectionReveal from "../components/SectionReveal.jsx";
import { filmFrames, songs } from "../data/content.js";

function Sprockets() {
  return (
    <div className="flex justify-between px-3">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="h-2.5 w-1.5 bg-cream/90 rounded-[1px]" />
      ))}
    </div>
  );
}

export default function MemoryFilmStrip() {
  const [active, setActive] = useState(null);
  const dragRef = useRef(null);

  return (
    <section id="memories" className="relative bg-[#241a18] px-0 py-28 sm:py-36 overflow-hidden">
      <div className="px-6 sm:px-12">
        <SectionReveal className="text-center mb-14">
          <p className="font-hand text-2xl text-blush/80 mb-1">chapter four</p>
          <h2 className="font-display italic text-4xl sm:text-5xl text-ivory">The Memories</h2>
          <p className="font-body font-light text-ivory/50 mt-3 text-sm">
            drag the film strip — click a frame to step inside it
          </p>
        </SectionReveal>
      </div>

      <div className="relative bg-ink py-2" ref={dragRef}>
        <Sprockets />
        <motion.div
          className="flex gap-4 px-8 py-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -(filmFrames.length * 240), right: 0 }}
          dragElastic={0.08}
        >
          {filmFrames.map((frame, i) => (
            <FilmFrame key={frame.id} frame={frame} index={i} onOpen={() => setActive(frame)} />
          ))}
        </motion.div>
        <Sprockets />
      </div>

      <div className="px-6 sm:px-12 mt-24">
        <SectionReveal className="text-center mb-12">
          <p className="font-hand text-xl text-blush/70">the soundtrack to all of it</p>
        </SectionReveal>
        <SectionReveal delay={0.1} className="max-w-2xl mx-auto bg-ivory/95 paper-shadow px-6 sm:px-10 py-4">
          {songs.map((song, i) => (
            <Song key={song.title} {...song} index={i} />
          ))}
        </SectionReveal>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 px-6 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-w-xl w-full"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <FrameImage src={active.src} alt={active.caption} className="w-full max-h-[55vh] object-cover" />
              <div className="text-center mt-6">
                <p className="font-hand text-xl text-blush/70">
                  {active.date} {active.location ? `· ${active.location}` : ""}
                </p>
                <p className="font-display italic text-2xl text-ivory mt-1">{active.caption}</p>
                <p className="font-body font-light text-ivory/60 mt-3 max-w-md mx-auto text-sm leading-relaxed">
                  {active.memory}
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute -top-4 -right-4 bg-ivory rounded-full p-2 paper-shadow"
                aria-label="close"
              >
                <X size={18} className="text-ink" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilmFrame({ frame, index, onOpen }) {
  return (
    <motion.button
      onClick={onOpen}
      className="relative shrink-0 w-[200px] h-[140px] bg-[#3a2a26] border-4 border-[#1b1210]"
      whileHover={{ scale: 1.03, rotate: index % 2 ? 1 : -1 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="absolute top-1 left-2 font-mono text-[9px] text-ivory/40">
        {String(index + 1).padStart(2, "0")}
      </span>
      <FrameImage src={frame.src} alt={frame.caption} className="w-full h-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute bottom-1.5 left-2 font-hand text-sm text-ivory/90">
        {frame.caption}
      </span>
    </motion.button>
  );
}

function FrameImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#4a2f2c] to-[#241a18] flex items-center justify-center`}>
        <span className="font-hand text-ivory/50 text-sm px-2 text-center">photo goes here</span>
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={className} draggable={false} />;
}
