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
    rolldownOptions: {
      external: ['vue', 'quasar', 'ol', 'axios'],
      output: {
        globals: {
          vue: 'Vue',
          quasar: 'Quasar',
          ol: 'ol',
          axios: 'axios'
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
      vue: 'Vue',
      quasar: 'Quasar',
      ol: 'ol',
      axios: 'axios'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
});