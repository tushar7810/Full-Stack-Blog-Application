import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config({
  path: ".env"
})

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/blog' : `${process.env.BACKEND_URL}`,
      '/user' : `${process.env.BACKEND_URL}`
    }
  },
  define: {
    'process.env.BACKEND_URL' : JSON.stringify(process.env.BACKEND_URL)
  },
  plugins: [react()],
})
