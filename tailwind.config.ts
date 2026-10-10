import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background:  "var(--background)",
        foreground:  "var(--foreground)",
        navy:        "var(--navy)",
        surface:     "var(--surface)",
        "surface-2": "var(--surface-2)",
        border:      "var(--border)",
        muted:       "var(--muted)",
        ink:         "var(--ink)",
        cream:       "var(--cream)",

        /* ── Semantic role tokens ── */
        primary: {
          DEFAULT: "var(--primary)",
          hover:   "var(--primary-hover)",
          fg:      "var(--primary-foreground)",
          light:   "var(--primary-light)",
        },
        teal: {
          DEFAULT: "var(--secondary)",
          hover:   "var(--secondary-hover)",
          light:   "var(--secondary-light)",
        },
        electric: {
          DEFAULT: "var(--accent)",
          hover:   "var(--accent-hover)",
          light:   "var(--accent-light)",
        },
        pink:    "var(--highlight-pink)",
        magenta: "var(--highlight-magenta)",
        gold: {
          DEFAULT: "var(--highlight-gold)",
          dark:    "#7A5A00",
        },

        /* ── Brand primitives, sampled from the Milarch logo ── */
        purple:           "#5B55A5",
        indigo:           "#2A2463",
        "brand-purple":   "#5B55A5",
        "brand-indigo":   "#2A2463",
        "brand-teal":     "#5EC4BA",
        "brand-electric": "#2BB2C2",
        "brand-pink":     "#E5195F",
        "brand-gold":     "#FFC20E",
        "brand-magenta":  "#E5195F",
      },
      backgroundImage: {
        "gradient-brand":   "var(--gradient-brand)",
        "gradient-pharma":  "var(--gradient-pharma)",
        "gradient-tech":    "var(--gradient-tech)",
        "gradient-gold":    "var(--gradient-gold)",
      },
      boxShadow: {
        sm:      "var(--shadow-sm)",
        md:      "var(--shadow-md)",
        lg:      "var(--shadow-lg)",
        colored: "var(--shadow-colored)",
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        tech:    ["var(--font-tech)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "76rem",
      },
    },
  },
  plugins: [],
};
export default config;
