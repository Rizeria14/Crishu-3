import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionReveal from "../components/SectionReveal.jsx";
import { stars } from "../data/content.js";

export default function Constellation() {
  const [opened, setOpened] = useState(() => new Set());
  const [active, setActive] = useState(null);

  const points = useMemo(
    () => stars.filter((s) => opened.has(s.id)).map((s) => `${s.x},${s.y}`).join(" "),
    [opened]
  );

  function handleClick(star) {
    setOpened((prev) => new Set(prev).add(star.id));
    setActive(star);
  }

  const allOpen = opened.size === stars.length;

  return (
    <section
      id="constellation"
      className="relative px-6 sm:px-12 py-28 sm:py-40 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 20%, #3a2436 0%, #241722 60%, #180f18 100%)" }}
    >
      {/* ambient twinkling dust */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-ivory motion-reduce:hidden"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              opacity: 0.15 + (i % 6) * 0.08,
              animation: `flicker ${3 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <SectionReveal className="relative z-10 text-center mb-4">
        <p className="font-hand text-2xl text-blush/70 mb-1">chapter five</p>
        <h2 className="font-display italic text-4xl sm:text-5xl text-ivory">The Sky</h2>
        <p className="font-body font-light text-ivory/50 mt-3 text-sm">
          {allOpen ? "you found all of them — look what they make." : "every star is something I love about you"}
        </p>
      </SectionReveal>

      <div className="relative z-10 mx-auto max-w-4xl h-[420px] sm:h-[500px] mt-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.polyline
            points={points}
            fill="none"
            stroke="#F0D3D6"
            strokeWidth="0.15"
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: opened.size > 1 ? 0.7 : 0 }}
            transition={{ duration: 1 }}
          />
        </svg>

        {stars.map((star) => {
          const isOpen = opened.has(star.id);
          return (
            <button
              key={star.id}
              onClick={() => handleClick(star)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              aria-label={star.label}
            >
              <motion.span
                className="block rounded-full bg-blush"
                animate={{
                  width: isOpen ? 10 : 6,
                  height: isOpen ? 10 : 6,
                  boxShadow: isOpen
                    ? "0 0 18px 6px rgba(240,211,214,0.7)"
                    : "0 0 8px 2px rgba(240,211,214,0.35)",
                }}
                whileHover={{ scale: 1.4 }}
                transition={{ duration: 0.5 }}
              />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory paper-shadow max-w-sm px-8 py-10 text-center"
            >
              <p className="font-hand text-2xl text-dusty-rose mb-2 capitalize">{active.label}</p>
              <p className="font-display italic text-xl text-ink leading-relaxed">{active.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
