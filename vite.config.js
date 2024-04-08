import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  preview: {
    port: 8086,
    strictPort: true
  },
  server: {
    port: 8086,
    strictPort: true,
    host: '0.0.0.0',
    origin: 'http://0.0.0.0:8086',
  }
})
