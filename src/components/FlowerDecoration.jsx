import { motion } from "framer-motion";

/**
 * A single line-art pink lily, drawn in CSS-variable-friendly strokes.
 * `variant` lets us vary the silhouette slightly so repeated lilies
 * don't look copy-pasted. `interactive` lets a lily be clicked (used
 * for the hidden secret note).
 */
export default function FlowerDecoration({
  className = "",
  size = 80,
  color = "#C08890",
  variant = 1,
  animate = true,
  onClick,
  interactive = false,
}) {
  const petals =
    variant === 1
      ? [
          "M50 50 C40 20, 10 15, 5 5 C25 5, 45 25, 50 50 Z",
          "M50 50 C65 15, 95 10, 100 0 C90 25, 70 40, 50 50 Z",
          "M50 50 C25 60, 5 90, 0 100 C15 85, 40 70, 50 50 Z",
          "M50 50 C75 65, 90 95, 95 100 C80 90, 60 70, 50 50 Z",
          "M50 50 C48 15, 55 -5, 55 -10 C60 5, 55 30, 50 50 Z",
        ]
      : [
          "M50 50 C35 25, 15 20, 8 8 C28 10, 45 28, 50 50 Z",
          "M50 50 C68 22, 92 15, 100 5 C88 28, 68 42, 50 50 Z",
          "M50 50 C30 65, 8 88, 2 98 C18 82, 40 68, 50 50 Z",
          "M50 50 C70 68, 85 92, 92 100 C78 88, 62 70, 50 50 Z",
        ];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      onClick={onClick}
      style={{ cursor: interactive ? "pointer" : "default", overflow: "visible" }}
      initial={animate ? { opacity: 0, scale: 0.85 } : false}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={interactive ? { scale: 1.08, rotate: 4 } : undefined}
    >
      {petals.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity={0.75}
        />
      ))}
      <circle cx="50" cy="50" r="3.2" fill={color} opacity={0.55} />
      <line x1="50" y1="53" x2="46" y2="90" stroke="#7C8C6E" strokeWidth="1" opacity={0.5} />
    </motion.svg>
  );
}

/** A cluster of lilies for corner / margin decoration. */
export function LilyCluster({ className = "", flip = false }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <FlowerDecoration size={54} variant={1} className="absolute" />
      <FlowerDecoration size={34} variant={2} color="#D9A7AD" className="absolute translate-x-8 translate-y-6 opacity-80" />
    </div>
  );
}
