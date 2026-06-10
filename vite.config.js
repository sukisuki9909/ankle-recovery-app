import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages compatible. Relative base lets it work from /repo-name/.
export default defineConfig({
  plugins: [react()],
  base: './'
});
