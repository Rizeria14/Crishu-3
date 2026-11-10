import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlowerDecoration from "./FlowerDecoration.jsx";
import { chapters } from "../data/content.js";

export default function ChapterNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(chapters[0].id);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col-reverse items-start gap-3">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative h-14 w-14 rounded-full bg-ivory/90 backdrop-blur-sm paper-shadow flex items-center justify-center"
        aria-label="open chapter menu"
        aria-expanded={open}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.5 }}>
          <FlowerDecoration size={30} animate={false} color="#6E2A34" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
            className="bg-ivory/95 backdrop-blur-sm paper-shadow rounded-2xl px-1.5 py-2 flex flex-col gap-0.5 min-w-[168px]"
          >
            {chapters.map((c, i) => (
              <button
                key={c.id}
                onClick={() => goTo(c.id)}
                className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors ${
                  active === c.id ? "bg-blush/60" : "hover:bg-blush/30"
                }`}
              >
                <ChapterIcon index={i} active={active === c.id} />
                <span
                  className={`font-display italic text-base ${
                    active === c.id ? "text-burgundy" : "text-ink-soft"
                  }`}
                >
                  {c.label}
                </span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

// tiny custom line-art icons, one per chapter, instead of emoji
function ChapterIcon({ index, active }) {
  const color = active ? "#6E2A34" : "#B08A8F";
  const icons = [
    // beginning — sprouting seed
    <path key="a" d="M6 11 C6 6 10 3 10 3 C10 3 14 6 14 11" />,
    // book
    <path key="b" d="M3 4 h6 a2 2 0 0 1 2 2 v9 a2 2 0 0 0 -2 -1 H3 Z M17 4 h-6 a2 2 0 0 0 -2 2 v9 a2 2 0 0 1 2 -1 h6 Z" />,
    // flower
    <path key="c" d="M10 10 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M10 10 C7 7 7 3 10 3 M10 10 C13 7 13 3 10 3 M10 10 C13 13 13 17 10 17 M10 10 C7 13 7 17 10 17" />,
    // film frame
    <path key="d" d="M3 4 h14 v12 H3 Z M3 7 h14 M3 13 h14 M6 4 v12 M14 4 v12" />,
    // star
    <path key="e" d="M10 2 L11.8 7.6 L17.6 7.6 L13 11 L14.8 16.6 L10 13.2 L5.2 16.6 L7 11 L2.4 7.6 L8.2 7.6 Z" />,
    // envelope / letter
    <path key="f" d="M3 5 h14 v10 H3 Z M3 5 l7 6 l7 -6" />,
    // sunset
    <path key="g" d="M3 14 h14 M6 14 a4 4 0 0 1 8 0 M10 4 v2 M4 7 l1.4 1.4 M16 7 l-1.4 1.4" />,
  ];
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {icons[index % icons.length]}
    </svg>
  );
}
