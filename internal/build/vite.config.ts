import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['packages/**/*.ts', 'packages/**/*.vue'],
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, '../../packages/cream-ui/src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'CreamUI',
      fileName: (format) => `cream-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          return assetInfo.name as string
        },
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@cream-ui': resolve(__dirname, '../../packages'),
    },
  },
})
