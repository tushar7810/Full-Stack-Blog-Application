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
      '/blog' : `https://full-stack-blog-application-ioqd.onrender.com/`,
      '/user' : `https://full-stack-blog-application-ioqd.onrender.com/`
    }
  },
  plugins: [react()],
})
