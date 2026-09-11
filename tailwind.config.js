/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        veyra: {
          bg: '#0a0a0c',
          surface: '#111114',
          silver: '#c2c5c8',
          bronze: '#8c725c',
          brass: '#c9a767',
          garnet: '#8a1f24',
          pure: '#faf9f6',
          muted: '#888785'
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        editorial: ['Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
