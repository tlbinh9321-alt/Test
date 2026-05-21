import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          mid: "#1E293B",
        },
        red: {
          vss: "#B91C1C",
          light: "#DC2626",
        },
        gold: {
          DEFAULT: "#D4A017",
          light: "#E8B84B",
        },
        cream: "#F8F5F0",
      },

      fontFamily: {
        serif: ['"Noto Serif"', "Georgia", "serif"],
        // font-sans   → Be Vietnam Pro (body, label, button — default)
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },

      fontSize: {
        "display-xl": ["clamp(48px, 7vw, 84px)", { lineHeight: "1.08" }],
        "display-lg": ["clamp(36px, 5vw, 60px)", { lineHeight: "1.1" }],
        "display-md": ["clamp(28px, 4vw, 48px)", { lineHeight: "1.15" }],
        "display-sm": ["clamp(22px, 3vw, 32px)", { lineHeight: "1.2" }],
      },

      borderRadius: {
        "2xl": "18px",
        xl: "10px",
      },

      backdropBlur: {
        xs: "4px",
      },

      animation: {
        "fade-up": "fadeUp 1s ease both",
        "pulse-pin": "pulsePin 2s ease infinite",
        "bounce-y": "bounceY 2s ease infinite",
      },

      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulsePin: {
          "0%": { boxShadow: "0 0 0 0   rgba(185,28,28,0.5)" },
          "70%": { boxShadow: "0 0 0 10px rgba(185,28,28,0)" },
          "100%": { boxShadow: "0 0 0 0   rgba(185,28,28,0)" },
        },
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },

      spacing: {
        section: "6rem", // py-section = py-24 equivalent
      },
    },
  },
  plugins: [],
};

export default config;
