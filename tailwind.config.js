/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ← enables manual dark mode toggle

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        surface: "var(--surface)",
        "surface-border": "var(--surface-border)",

        sandstone: "var(--color-sandstone)",
        "sandstone-border": "var(--color-sandstone-border)",

        charcoal: "var(--color-charcoal)",
        "charcoal-mid": "var(--color-charcoal-mid)",
        "charcoal-light": "var(--color-charcoal-light)",

        critical: "var(--color-critical)",
      },

      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },

      borderRadius: {
        xl: "0.75rem", // Apple-style rounded corners
        "2xl": "1rem",
      },

      boxShadow: {
        subtle: "0 1px 2px rgba(0,0,0,0.06)",
        card: "0 2px 6px rgba(0,0,0,0.08)",
      },

      spacing: {
        4.5: "1.125rem", // tighter vertical rhythm
      },
    },
  },

  plugins: [],
};
