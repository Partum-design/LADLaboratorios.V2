import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "lad-red": "#E30613",
        "lad-red-dark": "#A63336",
        "lad-red-light": "#F56A6E",
        "lad-ember": "#FF7A29",
        "lad-plasma": "#FF2E63",
        "lad-black": "#201E1E",
        "lad-gray-dark": "#302B2B",
        "lad-gray-mid": "#5A5353",
        "lad-gray-light": "#F6F3F2",
        "lad-white": "#FEFEFE",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        lad: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        glass: "0 24px 60px -24px rgba(32, 30, 30, 0.18)",
        "glass-sm": "0 12px 32px -16px rgba(32, 30, 30, 0.16)",
        red: "0 16px 40px -16px rgba(227, 6, 19, 0.45)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "aurora-a": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(4%, 6%) scale(1.15)" },
        },
        "aurora-b": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-6%, -4%) scale(1.12)" },
        },
        "aurora-c": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.7" },
          "50%": { transform: "translate(3%, -5%) scale(1.22)", opacity: "1" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "48px 48px" },
        },
        "scan-sweep": {
          "0%": { transform: "translateY(-20%)", opacity: "0" },
          "12%": { opacity: "0.55" },
          "50%": { opacity: "0.3" },
          "88%": { opacity: "0.55" },
          "100%": { transform: "translateY(520%)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-up": "slide-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "aurora-a": "aurora-a 16s ease-in-out infinite",
        "aurora-b": "aurora-b 20s ease-in-out infinite",
        "aurora-c": "aurora-c 13s ease-in-out infinite",
        "grid-pan": "grid-pan 26s linear infinite",
        "scan-sweep": "scan-sweep 9s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
