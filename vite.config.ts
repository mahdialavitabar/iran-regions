import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IranRegions',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name || 'asset';
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
}));
