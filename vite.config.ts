import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public_assets',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173,
    host: true
  }
})
