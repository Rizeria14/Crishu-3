import { motion } from "framer-motion";

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Wrap any content to have it fade + settle into place as it scrolls
 * into view. Slow, deliberate timing — this is meant to feel like a
 * page turning, not a UI element mounting.
 */
export default function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1.1,
  className = "",
  once = true,
  amount = 0.25,
}) {
  const offset = directions[direction] ?? directions.up;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
