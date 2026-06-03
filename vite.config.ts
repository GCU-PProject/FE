import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    proxy: {
      '/ai-api': {
        target: 'https://glaw-web.duckdns.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/ai-api/, '/ai'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
