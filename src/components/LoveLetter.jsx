import { motion } from "framer-motion";

/**
 * Renders long-form letter text as if written on a physical page,
 * revealing gradually as the reader scrolls rather than all at once.
 */
export default function LoveLetter({ title, body, closing }) {
  const paragraphs = body.split("\n\n");

  return (
    <div className="relative mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -0.6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="paper-grain paper-shadow bg-ivory px-7 py-12 sm:px-14 sm:py-16"
        style={{ "--grain-opacity": 0.06 }}
      >
        <h2 className="font-display italic text-4xl sm:text-5xl text-ink mb-10 text-center">
          {title}
        </h2>

        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-xl sm:text-2xl text-ink-soft leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {closing && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 text-center font-hand text-3xl text-burgundy"
          >
            {closing.map((line, i) => (
              <p key={i} className={i === 0 ? "mb-1" : "text-2xl text-burgundy/70"}>
                {line}
              </p>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
