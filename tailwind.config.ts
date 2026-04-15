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
        navy: "var(--navy)",
        surface: "var(--surface)",
        electric: "#2BB2C2",
        indigo: "#322970",
        teal: "#5BBAB5",
        purple: "#5E51A2",
        pink: "#E81B62",
        gold: "#FDB813",
        softwhite: "#F8FAFC",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Light version — soft white-to-slate radial
        'fluid-bg': 'radial-gradient(circle at 50% 50%, #f8fafc 0%, #e2e8f0 100%)',
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
