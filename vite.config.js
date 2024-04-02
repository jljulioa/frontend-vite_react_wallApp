import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  preview: {
    port: 8085,
    strictPort: true
  },
  server: {
    port: 8085,
    strictPort: true,
    host: true,
    origin: 'http://localhost:8085'
  }
})
