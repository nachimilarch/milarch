import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
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
          dark:    "#7A5A00",   /* accessible text version (WCAG AA on white) */
        },

        /* ── Updated legacy aliases — same Tailwind name, corrected brand value ── */
        purple:    "#4A3D8F",   /* was #5E51A2 — now matches --brand-purple */
        indigo:    "#3D3589",   /* was #322970 — now matches --brand-indigo  */
        softwhite: "#F8FAFC",

        /* ── Brand primitives (use when you need exact hex) ── */
        "brand-purple":   "#4A3D8F",
        "brand-indigo":   "#3D3589",
        "brand-teal":     "#5BBAB5",
        "brand-electric": "#2BB2C2",
        "brand-pink":     "#E81B62",
        "brand-gold":     "#FDB813",
        "brand-magenta":  "#E8217A",
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "fluid-bg":         "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F7F6FB 100%)",
        "tech-gradient":    "linear-gradient(135deg, #2BB2C2 0%, #3D3589 100%)",
        "pharma-gradient":  "linear-gradient(135deg, #4A3D8F 0%, #E81B62 50%, #FDB813 100%)",
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
      animation: {
        "float":          "float 6s ease-in-out infinite",
        "float-delayed":  "float 6s ease-in-out 3s infinite",
        "pulse-slow":     "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-20px)" },
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)"],
        display: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;
