import { resolve } from 'path'
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    rollupOptions: {
      input: {
        'main': resolve(__dirname, 'src/index/index.html'),
        'login': resolve(__dirname, 'src/login/index.html'),
        'signup': resolve(__dirname, 'src/signup/index.html'),
      },
    },
  }
});
