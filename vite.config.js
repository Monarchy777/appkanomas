import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: true,
    allowedHosts: true,
    watch: {
      ignored: ['**/*.mp3', '**/public/assets/audio/**', '**/public/assets/*.mp3']
    }
  }
});
