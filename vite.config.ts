import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    server: {
      port: 3000,
      proxy: {
        '/ai': {
          target: 'https://api.glaw.site',
          changeOrigin: true,
          secure: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
