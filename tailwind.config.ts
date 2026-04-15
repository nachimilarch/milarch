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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "var(--navy)", // used as dark variant in specific components
        surface: "var(--surface)",
        electric: "#2BB2C2", // Tech cyan
        indigo: "#322970", // Tech dark indigo
        teal: "#5BBAB5", // Pharma teal
        purple: "#5E51A2", // Pharma purple
        pink: "#E81B62", // Pharma pink
        gold: "#FDB813", // Pharma yellow
        softwhite: "#F8FAFC",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'fluid-bg': 'radial-gradient(circle at 50% 50%, #0A0B1A 0%, #05050A 100%)',
        'tech-gradient': 'linear-gradient(135deg, #2BB2C2 0%, #322970 100%)',
        'pharma-gradient': 'linear-gradient(135deg, #5E51A2 0%, #E81B62 50%, #FDB813 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-space-grotesk)'],
      }
    },
  },
  plugins: [],
};
export default config;
