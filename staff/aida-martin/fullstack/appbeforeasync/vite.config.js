import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['com']
  },
  build: {
    commonjsOptions: {
      include: [/com/, /node_modules/]
    }
  }
})
