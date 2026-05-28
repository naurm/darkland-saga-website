/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          900: "#1c1409",
          800: "#2a1f10",
          700: "#3d2e18",
          600: "#5a4428",
          500: "#8a6638",
          400: "#b8944f",
          300: "#d4b778",
          200: "#e8d4a8",
          100: "#f5e8cc",
        },
        parchment: {
          950: "#0f0d08",
          900: "#1a1610",
          800: "#26201a",
          700: "#3a3228",
          600: "#5a4e3e",
          400: "#a8987a",
          300: "#c8b898",
          200: "#e0d4bc",
          100: "#f0e8d8",
        },
        emberglow: {
          DEFAULT: "#b8944f",
          dim: "#8a6638",
          bright: "#d4b778",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "DM Serif Display", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}