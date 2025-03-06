import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 10000,
    host: '0.0.0.0'
  },
  preview: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['task-manager-client-h2i0.onrender.com']
  }
})
