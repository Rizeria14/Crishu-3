/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF5EC",
        ivory: "#F7EFE3",
        parchment: "#F1E4D3",
        blush: "#F0D3D6",
        rose: "#D9A7AD",
        "dusty-rose": "#C08890",
        burgundy: "#6E2A34",
        "burgundy-deep": "#4A1B22",
        sage: "#A9B79C",
        "sage-deep": "#7C8C6E",
        ink: "#3B2E2A",
        "ink-soft": "#5A4A44",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Jost'", "sans-serif"],
        hand: ["'Caveat'", "cursive"],
        script: ["'Petit Formal Script'", "cursive"],
      },
      letterSpacing: {
        wideish: "0.04em",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate(-10vw, -10vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translate(10vw, 110vh) rotate(220deg)", opacity: "0" },
        },
        bloom: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        drift: "drift linear forwards",
        bloom: "bloom 2.6s cubic-bezier(0.22,1,0.36,1) forwards",
        flicker: "flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
