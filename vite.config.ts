import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Ignore typical build/output folders and vercel metadata to avoid file-watch-triggered reloads
    watch: {
      ignored: ['**/dist/**', '**/build/**', '**/.vercel/**', '**/.vercel_build_output/**', '**/node_modules/**']
    }
  }
})
