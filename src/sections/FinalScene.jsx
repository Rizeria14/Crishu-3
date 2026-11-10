import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Flower2, Film, Star, Mail } from "lucide-react";
import FlowerDecoration from "../components/FlowerDecoration.jsx";
import PetalAnimation from "../components/PetalAnimation.jsx";
import { finale, names } from "../data/content.js";

const echoes = [BookOpen, Flower2, Film, Star, Mail];

export default function FinalScene() {
  const [revealed, setRevealed] = useState(false);
  const [bloomed, setBloomed] = useState(false);

  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 text-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F7D9C4 0%, #F0D3D6 35%, #E7B9C0 65%, #C98A94 100%)",
      }}
    >
      <PetalAnimation count={12} />

      {/* faint echoes of every chapter, drifting quietly in the sunset */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        {echoes.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-burgundy"
            style={{ left: `${12 + i * 18}%`, top: `${20 + (i % 3) * 22}%` }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={26} strokeWidth={1.2} />
          </motion.div>
        ))}
      </div>

      {!revealed ? (
        <div className="relative z-10 space-y-4">
          {finale.lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.1, delay: i * 1.1, ease: "easeOut" }}
              className="font-display italic text-3xl sm:text-5xl text-ink"
            >
              {line}
            </motion.p>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 1, delay: finale.lines.length * 1.1 + 0.6 }}
            onClick={() => setRevealed(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 font-hand text-2xl text-burgundy border border-burgundy/30 rounded-full px-8 py-3 hover:bg-burgundy hover:text-ivory transition-colors duration-500"
          >
            {finale.buttonLabel}
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.button
            onClick={() => setBloomed(true)}
            animate={bloomed ? { scale: 1.3 } : { scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            aria-label="open the final flower"
          >
            <FlowerDecoration size={120} animate={false} color="#6E2A34" />
          </motion.button>

          <AnimatePresence>
            {bloomed && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-10 max-w-md"
              >
                <p className="font-display italic text-2xl text-ink leading-relaxed">
                  {finale.finalFlowerMessage}
                </p>

                <div className="mt-14 space-y-1">
                  <p className="font-hand text-xl text-burgundy/70">{finale.credit.line}</p>
                  <p className="font-display italic text-lg text-ink">
                    {names.her} &amp; {names.you}
                  </p>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-soft/50 mt-4">
                    {finale.credit.chapterNote}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
