// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'

import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    checker({ typescript: true }), // run tsc in a worker
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'analytics': ['@vercel/analytics', '@vercel/speed-insights'],
        }
      }
    },
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
})
