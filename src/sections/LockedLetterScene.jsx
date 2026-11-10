
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Unlock } from "lucide-react";

import LoveLetter from "../components/LoveLetter.jsx";
import PetalAnimation from "../components/PetalAnimation.jsx";
import SectionReveal from "../components/SectionReveal.jsx";
import { lockedLetter } from "../data/content.js";

export default function LockedLetterScene() {
  const [unlocked, setUnlocked] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const lockRef = useRef(null);
  const keyRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function handleDragEnd() {
    setIsDragging(false);

    const lock = lockRef.current;
    const key = keyRef.current;

    if (!lock || !key || unlocked) return;

    // Get both elements' actual viewport positions
    const lockRect = lock.getBoundingClientRect();
    const keyRect = key.getBoundingClientRect();

    // Calculate the center of the dragged key
    const keyCenterX = keyRect.left + keyRect.width / 2;
    const keyCenterY = keyRect.top + keyRect.height / 2;

    // Expand the lock's detection area
    const padding = 100;

    const lockLeft = lockRect.left - padding;
    const lockRight = lockRect.right + padding;
    const lockTop = lockRect.top - padding;
    const lockBottom = lockRect.bottom + padding;

    // Check whether the key's center enters the lock area
    const droppedCorrectly =
      keyCenterX >= lockLeft &&
      keyCenterX <= lockRight &&
      keyCenterY >= lockTop &&
      keyCenterY <= lockBottom;

    console.log("Key center:", keyCenterX, keyCenterY);
    console.log("Lock bounds:", lockLeft, lockRight, lockTop, lockBottom);
    console.log("Unlock successful:", droppedCorrectly);

    if (droppedCorrectly) {
      setUnlocked(true);
    } else {
      setWiggle(true);

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setWiggle(false);
      }, 500);
    }
  }

  return (
    <section
      id="letter"
      className="relative bg-blush/25 px-6 sm:px-12 py-28 sm:py-40 overflow-hidden"
    >
      <PetalAnimation count={6} />

      <SectionReveal className="relative z-10 text-center mb-16">
        <p className="font-hand text-2xl text-dusty-rose mb-1">
          chapter six
        </p>

        <h2 className="font-display italic text-4xl sm:text-5xl text-ink mb-4">
          The Letter
        </h2>

        <p className="font-body font-light text-ink-soft max-w-md mx-auto">
          {lockedLetter.intro}
        </p>
      </SectionReveal>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 mx-auto max-w-md flex flex-col items-center gap-14 py-10"
          >
            <p className="font-hand text-lg text-ink-soft/70 -mb-6">
              {isDragging ? "bring the key to the lock..." : "drag the key into the lock"}
            </p>

            <div className="flex items-center justify-center gap-20 sm:gap-28">

              {/* LOCK */}
              <motion.div
                ref={lockRef}
                animate={
                  wiggle
                    ? { x: [0, -8, 8, -6, 6, 0] }
                    : { scale: isDragging ? 1.08 : 1 }
                }
                transition={{ duration: 0.4 }}
                className="relative h-28 w-28 rounded-full bg-ivory paper-shadow flex items-center justify-center border-2 border-burgundy/20"
              >
                <motion.div
                  animate={{
                    borderColor: isDragging
                      ? "rgba(128, 40, 65, 0.9)"
                      : "rgba(128, 40, 65, 0.4)",
                  }}
                  className="h-10 w-10 rounded-full border-4 border-burgundy/40 flex items-center justify-center"
                >
                  <div className="h-5 w-2.5 bg-burgundy/40 rounded-b-sm" />
                </motion.div>
              </motion.div>

              {/* DRAGGABLE KEY */}
              <motion.div
                ref={keyRef}
                drag
                dragMomentum={false}
                dragElastic={0.05}
                dragSnapToOrigin
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                whileDrag={{
                  scale: 1.2,
                  rotate: -15,
                  zIndex: 50,
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: -8,
                }}
                className="relative z-20 cursor-grab active:cursor-grabbing text-burgundy touch-none"
              >
                <Key size={46} strokeWidth={1.4} />
              </motion.div>
            </div>

            <p className="font-hand text-sm text-ink-soft/50">
              a little surprise is waiting inside ♡
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 150,
              }}
              className="flex justify-center mb-8 text-dusty-rose"
            >
              <Unlock size={42} strokeWidth={1.3} />
            </motion.div>

            <LoveLetter
              title={lockedLetter.title}
              body={lockedLetter.body}
              closing={lockedLetter.closing}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
