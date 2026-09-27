/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kanomas: {
          dark: '#0f172a',
          navy: '#14222e',
          accent: '#ea580c',
          gold: '#d97706',
          goldLight: '#fef3c7',
          emerald: '#059669',
          light: '#f8fafc',
          card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        arabic: ['Amiri', 'Traditional Arabic', 'serif']
      }
    },
  },
  plugins: [],
}
