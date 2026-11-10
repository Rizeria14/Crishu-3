import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FlowerDecoration from "../components/FlowerDecoration.jsx";
import PetalAnimation from "../components/PetalAnimation.jsx";
import SectionReveal from "../components/SectionReveal.jsx";
import { gardenFlowers } from "../data/content.js";

export default function FlowerGarden() {
  const [opened, setOpened] = useState(() => new Set());
  const [active, setActive] = useState(null);

  function handleClick(flower) {
    setOpened((prev) => new Set(prev).add(flower.id));
    setActive(flower);
  }

  return (
    <section id="garden" className="relative bg-sage/10 px-6 sm:px-12 py-28 sm:py-36 overflow-hidden">
      <PetalAnimation count={5} />

      <SectionReveal className="text-center mb-4 relative z-10">
        <p className="font-hand text-2xl text-dusty-rose mb-1">chapter three</p>
        <h2 className="font-display italic text-4xl sm:text-5xl text-ink">The Garden</h2>
        <p className="font-body font-light text-ink-soft mt-3 text-sm max-w-md mx-auto">
          Every flower here is something I love about you. Touch one.
        </p>
      </SectionReveal>

      <div className="relative mx-auto max-w-5xl h-[520px] sm:h-[620px] mt-8">
        {gardenFlowers.map((flower) => {
          const isOpen = opened.has(flower.id);
          return (
            <button
              key={flower.id}
              onClick={() => handleClick(flower)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
              aria-label={flower.secret ? "a hidden flower" : flower.label}
            >
              <motion.div
                animate={{
                  scale: isOpen ? 1.15 : 1,
                  opacity: flower.secret && !isOpen ? 0.25 : 1,
                }}
                whileHover={{ scale: isOpen ? 1.2 : 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <FlowerDecoration
                  size={flower.size}
                  variant={flower.variant}
                  color={isOpen ? "#6E2A34" : "#C08890"}
                  interactive
                />
              </motion.div>
              {!flower.secret && (
                <span className="font-hand text-sm text-ink-soft/70 mt-1 hidden sm:block">
                  {flower.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="relative z-10 text-center mt-2 font-body text-xs text-ink-soft/50">
        {opened.size} of {gardenFlowers.length} flowers found
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory paper-shadow max-w-sm px-8 py-10 text-center"
            >
              <FlowerDecoration size={46} className="mx-auto mb-4" animate={false} />
              {!active.secret && (
                <p className="font-hand text-2xl text-dusty-rose mb-2 capitalize">
                  {active.label}
                </p>
              )}
              <p className="font-display italic text-xl text-ink leading-relaxed">
                {active.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
