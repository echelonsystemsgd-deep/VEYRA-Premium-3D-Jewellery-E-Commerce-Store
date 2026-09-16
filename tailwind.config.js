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
          bg: '#fafaf9',
          surface: '#ffffff',
          subtle: '#f5f5f4',
          border: '#e7e5e4',
          'border-subtle': '#f0eeec',
          text: '#1c1917',
          muted: '#78716c',
          faint: '#a8a29e',
          silver: '#8d9297',
          bronze: '#785942',
          brass: '#967538',
          garnet: '#881337'
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
