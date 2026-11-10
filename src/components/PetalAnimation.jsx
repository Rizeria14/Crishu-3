import { useMemo } from "react";

function Petal({ delay, duration, left, scale, opacity }) {
  return (
    <div
      className="absolute top-0 will-change-transform motion-reduce:hidden"
      style={{
        left: `${left}%`,
        animation: `drift ${duration}s linear ${delay}s infinite`,
      }}
    >
      <svg width={14 * scale} height={14 * scale} viewBox="0 0 20 20" style={{ opacity }}>
        <path
          d="M10 1 C15 5, 18 9, 10 19 C2 9, 5 5, 10 1 Z"
          fill="#D9A7AD"
        />
      </svg>
    </div>
  );
}

/**
 * Drifting pink lily petals. `count` controls density — keep this low
 * (6–10) so it stays a quiet ambient detail, not confetti.
 */
export default function PetalAnimation({ count = 8, className = "" }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        scale: 0.7 + Math.random() * 0.9,
        opacity: 0.35 + Math.random() * 0.4,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </div>
  );
}
