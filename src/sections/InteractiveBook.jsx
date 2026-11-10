import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FlowerDecoration from "../components/FlowerDecoration.jsx";
import SectionReveal from "../components/SectionReveal.jsx";
import { diaryPages } from "../data/content.js";

export default function InteractiveBook() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [secret, setSecret] = useState(null);

  function next() {
    if (page >= diaryPages.length - 1) return;
    setDirection(1);
    setPage((p) => p + 1);
    setSecret(null);
  }
  function prev() {
    if (page <= 0) return;
    setDirection(-1);
    setPage((p) => p - 1);
    setSecret(null);
  }

  const current = diaryPages[page];

  return (
    <section id="book" className="relative bg-ivory px-6 sm:px-12 py-28 sm:py-40 overflow-hidden">
      <div className="mx-auto max-w-3xl">
        <SectionReveal className="text-center mb-16">
          <p className="font-hand text-2xl text-dusty-rose mb-1">chapter two</p>
          <h2 className="font-display italic text-4xl sm:text-5xl text-ink">The Diary</h2>
          <p className="font-body font-light text-ink-soft mt-3 text-sm">
            {open ? "" : "click the book to open it"}
          </p>
        </SectionReveal>

        <div className="relative mx-auto" style={{ perspective: 1600, maxWidth: 560 }}>
          {!open ? (
            <motion.button
              onClick={() => setOpen(true)}
              className="relative mx-auto block w-56 h-72 sm:w-64 sm:h-80"
              whileHover={{ scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
              aria-label="open the diary"
            >
              <div className="absolute inset-0 bg-burgundy rounded-[2px] paper-shadow" />
              <div className="absolute inset-2 border border-blush/40 rounded-[1px] flex flex-col items-center justify-center gap-3">
                <FlowerDecoration size={54} color="#F0D3D6" animate={false} />
                <span className="font-display italic text-blush text-xl">our story</span>
              </div>
              <div className="absolute left-0 top-2 bottom-2 w-2 bg-burgundy-deep rounded-l-[2px]" />
            </motion.button>
          ) : (
            <div className="relative">
              <div
                className="relative bg-parchment paper-shadow paper-grain mx-auto"
                style={{ width: "100%", minHeight: 380, "--grain-opacity": 0.05 }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-burgundy-deep/80" />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    initial={{ rotateY: direction * 70, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: direction * -70, opacity: 0 }}
                    transition={{ duration: 0.65, ease: [0.6, 0, 0.3, 1] }}
                    style={{ transformOrigin: direction === 1 ? "left center" : "right center" }}
                    className="px-8 sm:px-14 py-12"
                  >
                    <p className="font-hand text-xl text-dusty-rose mb-1">{current.date}</p>
                    <h3 className="font-display italic text-2xl sm:text-3xl text-ink mb-5">
                      {current.title}
                    </h3>
                    <div className="space-y-4">
                      {current.body.split("\n\n").map((p, i) => (
                        <p key={i} className="font-display text-lg text-ink-soft leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {current.pressedFlower && (
                      <button
                        onClick={() => setSecret(current.secret)}
                        className="mt-6 inline-block"
                        aria-label="a pressed flower — click it"
                      >
                        <FlowerDecoration size={38} color="#C08890" />
                      </button>
                    )}

                    <AnimatePresence>
                      {secret && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="font-hand text-xl text-burgundy mt-3"
                        >
                          {secret}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* physical-feeling page controls */}
              <div className="flex items-center justify-between mt-6 px-2">
                <button
                  onClick={prev}
                  disabled={page === 0}
                  className="flex items-center gap-1 font-hand text-xl text-burgundy disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} /> back
                </button>
                <span className="font-body text-xs text-ink-soft/60 tracking-wide">
                  {page + 1} / {diaryPages.length}
                </span>
                <button
                  onClick={next}
                  disabled={page === diaryPages.length - 1}
                  className="flex items-center gap-1 font-hand text-xl text-burgundy disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
