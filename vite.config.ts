// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    checker({ typescript: true }), // run tsc in a worker
  ],
});
