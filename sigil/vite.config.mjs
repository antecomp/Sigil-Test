import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
  base: './',
	resolve: {
		alias: {
		  '~': path.resolve(__dirname, './src'),
		},
	},
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});