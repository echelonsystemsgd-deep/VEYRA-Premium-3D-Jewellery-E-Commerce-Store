/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        veyra: {
          bg: '#fbf9f5',
          surface: '#ffffff',
          subtle: '#f6f3ed',
          border: '#e7e2da',
          'border-subtle': '#eeebe5',
          text: '#1c1917',
          muted: '#57534e',
          faint: '#8c827a',
          silver: '#787c82',
          bronze: '#785942',
          brass: '#967538',
          gold: '#b38728',
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
