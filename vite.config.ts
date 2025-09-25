import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This safely injects the environment variable from your hosting provider (Netlify)
    // into your application code, making `process.env.API_KEY` available.
    // Ensure your Netlify variable is named VITE_API_KEY.
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})
