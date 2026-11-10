import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

/**
 * A tiny corner music button styled like a vintage player rather than
 * a standard <audio> control. Never autoplays — she has to press play.
 */
export default function MusicPlayer({ title, artist, src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  function toggle() {
    if (errored) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setErrored(true));
    }
    setPlaying(!playing);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} src={src} loop onError={() => setErrored(true)} />
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-ivory/90 backdrop-blur-sm border border-burgundy/15 paper-shadow rounded-full pl-2 pr-4 py-2"
        title={errored ? "add a song in src/data/content.js" : playing ? "pause our song" : "play our song"}
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-ink">
          <motion.span
            className="absolute inset-[3px] rounded-full bg-blush"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
          />
          <Music2 size={12} className="relative z-10 text-ink" />
        </span>
        <span className="text-left leading-tight hidden sm:block">
          <span className="block font-hand text-base text-burgundy -mb-0.5">{title}</span>
          <span className="block font-body text-[10px] tracking-wide text-ink-soft/70">
            {artist}
          </span>
        </span>
      </motion.button>
    </div>
  );
}
