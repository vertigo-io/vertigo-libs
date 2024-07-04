import { fileURLToPath, URL } from 'url'

const path = require('path')
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteExternalsPlugin } from 'vite-plugin-externals'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'VertigoUi',
      fileName: (format) => `vertigo-ui.${format}.js`
    },
    rollupOptions: {
      // overwrite default .html entry
      input: '/src/main.js',
      // make sure to externalize deps that shouldn't be bundled
      // into your library

      external: ['vue', 'quasar', 'ol'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          quasar: 'Quasar',
          ol: 'ol'
        }
      }
    }
  },
  server: { },
  plugins: [
    vue(),
    viteExternalsPlugin({
      vue: 'Vue',
      quasar: 'Quasar',
      ol: 'ol'
    }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
