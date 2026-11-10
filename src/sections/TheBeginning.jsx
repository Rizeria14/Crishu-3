import { motion } from "framer-motion";
import Photo from "../components/Photo.jsx";
import FlowerDecoration from "../components/FlowerDecoration.jsx";
import PetalAnimation from "../components/PetalAnimation.jsx";
import { beginning } from "../data/content.js";

export default function TheBeginning() {
  return (
    <section id="beginning" className="relative min-h-screen bg-cream overflow-hidden px-6 sm:px-12 pt-28 pb-24">
      <PetalAnimation count={5} />

      {/* flowers that grow in as the chapter is read */}
      <motion.div
        className="absolute bottom-0 left-0 opacity-70"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.7, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <FlowerDecoration size={110} />
      </motion.div>
      <motion.div
        className="absolute top-10 right-6 opacity-60"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 0.6, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <FlowerDecoration size={70} variant={2} />
      </motion.div>

      <div className="relative mx-auto max-w-4xl text-center">
        {beginning.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 1.2, delay: i * 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-4xl sm:text-6xl text-ink leading-tight"
          >
            {line}
          </motion.p>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, delay: beginning.lines.length * 0.9 + 0.5 }}
          className="font-hand text-2xl text-dusty-rose mt-8"
        >
          {beginning.subtitle}
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-4xl mt-20 grid grid-cols-3 gap-4 sm:gap-8 items-end">
        {beginning.photos.map((p, i) => (
          <Photo
            key={p.src}
            src={p.src}
            alt={p.alt}
            style={i === 1 ? "polaroid" : "taped"}
            rotate={p.rotate}
            className={i === 1 ? "col-span-1 -translate-y-4" : "col-span-1"}
            revealDelay={beginning.lines.length * 0.9 + 0.9 + i * 0.15}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-hand text-dusty-rose text-base"
      >
        keep going ♡
      </motion.p>
    </section>
  );
}
