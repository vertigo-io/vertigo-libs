import { fileURLToPath, URL } from 'node:url'

import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteExternalsPlugin } from 'vite-plugin-externals';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'dsfr',
      fileName: (format) => `dsfr.${format}.js`,
    },
    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      },
    },
  },
  css: {
    lightningcss: {
      errorRecovery: true
    }
  },
  plugins: [
    vue(),
    viteExternalsPlugin({
      vue: 'Vue'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})