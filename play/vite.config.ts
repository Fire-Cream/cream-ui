import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'cream-ui': resolve(__dirname, '../packages/cream-ui/src/index.ts'),
      '@cream-ui': resolve(__dirname, '../packages'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['import'],
      },
    },
  },
  server: {
    port: 3001,
    open: true,
  },
})
