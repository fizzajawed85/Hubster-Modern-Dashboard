import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // lowercase 'react', same as import
  build: {
    outDir: 'dist'
  },
  base: '' // leave empty for Vercel SPA
});
