import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    // This ensures process.env is available in the client
    'process.env': {}
  }
}) 