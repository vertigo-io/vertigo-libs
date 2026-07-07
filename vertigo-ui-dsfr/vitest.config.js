import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // @vitest/coverage-v8
      reporter: ['text', 'json', 'lcov', 'clover'],
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.js'],
      exclude: [
        'src/__tests__/**',
        'vite.config.js',
        'vitest.config.js',
        'dist/**',
        'node_modules/**'
      ],
      thresholds: {
        perFile: true,
        autoUpdate: false
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})