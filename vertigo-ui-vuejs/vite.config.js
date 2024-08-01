import { fileURLToPath, URL } from 'url';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'VertigoUi',
      fileName: (format) => `vertigo-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'quasar', 'ol'],
      output: {
        globals: {
          vue: 'Vue',
          quasar: 'Quasar',
          ol: 'ol'
        },
      },
    },
  },
  server: {},
  plugins: [
    vue(),
    viteExternalsPlugin({
      vue: 'Vue',
      quasar: 'Quasar',
      ol: 'ol'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
