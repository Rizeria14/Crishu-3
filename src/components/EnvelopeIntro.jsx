import { useState } from "react";
import { motion } from "framer-motion";
import PetalAnimation from "./PetalAnimation.jsx";
import { envelope } from "../data/content.js";

/**
 * A sealed envelope she has to open. Clicking triggers the flap
 * lifting, a letter sliding out, then the camera "pushing in" on
 * the letter (scale + opacity) until it dissolves into Chapter 1.
 */
export default function EnvelopeIntro({ onOpen }) {
  const [stage, setStage] = useState("sealed"); // sealed -> opening -> rising -> entering
  const closing = stage !== "sealed";

  function handleClick() {
    if (stage !== "sealed") return;
    setStage("opening");
    setTimeout(() => setStage("rising"), 900);
    setTimeout(() => setStage("entering"), 2000);
    setTimeout(() => onOpen(), 3100);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A1D1B] overflow-hidden"
      animate={{ opacity: stage === "entering" ? 0 : 1 }}
      transition={{ duration: 1.1, ease: [0.6, 0, 0.3, 1] }}
      style={{ pointerEvents: stage === "entering" ? "none" : "auto" }}
    >
      <PetalAnimation count={stage === "sealed" ? 3 : 9} />

      <div className="relative" style={{ perspective: 1200 }}>
        {/* envelope body */}
        <motion.button
          onClick={handleClick}
          className="relative block"
          animate={
            stage === "sealed"
              ? { scale: 1 }
              : { scale: stage === "entering" ? 6 : 1.15, y: stage === "entering" ? -40 : -10 }
          }
          transition={{ duration: stage === "entering" ? 1.3 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={stage === "sealed" ? { scale: 1.04 } : {}}
          aria-label="open the envelope"
        >
          <div className="relative w-[220px] h-[150px] sm:w-[260px] sm:h-[176px]">
            {/* back of envelope */}
            <div className="absolute inset-0 bg-[#F1E4D3]" />

            {/* letter sliding out */}
            <motion.div
              className="absolute left-1/2 top-2 w-[190px] sm:w-[224px] h-[130px] sm:h-[154px] -translate-x-1/2 bg-cream paper-shadow"
              initial={{ y: 0 }}
              animate={{ y: stage === "sealed" ? 0 : stage === "opening" ? -14 : -70 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 1 }}
            />

            {/* bottom flap */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 100%, 50% 40%, 100% 100%)",
                background: "#E7CFCF",
                zIndex: 2,
              }}
            />
            {/* left flap */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 50% 40%, 0 100%)",
                background: "#EBD6D6",
                zIndex: 2,
              }}
            />
            {/* right flap */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(100% 0, 50% 40%, 100% 100%)",
                background: "#EBD6D6",
                zIndex: 2,
              }}
            />
            {/* top flap — opens on click */}
            <motion.div
              className="absolute inset-0 origin-top"
              style={{
                clipPath: "polygon(0 0, 50% 40%, 100% 0)",
                background: "#F0D3D6",
                zIndex: 3,
                transformStyle: "preserve-3d",
              }}
              animate={{ rotateX: stage === "sealed" ? 0 : -170 }}
              transition={{ duration: 0.8, ease: [0.6, 0, 0.3, 1] }}
            />

            {/* wax seal */}
            <motion.div
              className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-burgundy border border-burgundy-deep flex items-center justify-center"
              style={{ zIndex: 4 }}
              animate={{ opacity: stage === "sealed" ? 1 : 0, scale: stage === "sealed" ? 1 : 0.6 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-blush text-[10px] font-display italic">
                {envelope && "♡"}
              </span>
            </motion.div>
          </div>
        </motion.button>
      </div>

      {stage === "sealed" && (
        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-hand text-2xl sm:text-3xl text-blush/90"
          >
            {envelope.line1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="font-display italic text-sm text-blush/50 mt-2 tracking-wide"
          >
            {envelope.line2}
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}
