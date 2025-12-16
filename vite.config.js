/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CC-206-/',
  server: {
    port: 3000,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CC-206-/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CC-206-/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Good, you already have this
    // Add the following lines:
    copyPublicDir: true, // Explicitly copies the 'public' folder to 'dist'
    rollupOptions: {
      output: {
        // Cleaner naming for built files (optional but good practice)
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
    // Helps prevent issues with large chunks
    chunkSizeWarningLimit: 800,
  },
  // Explicitly set the public directory
  publicDir: 'public'
})