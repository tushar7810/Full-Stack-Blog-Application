import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import env from ''

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/blog' : `http://localhost:${process.env.PORT}`,
      '/user' : `http://localhost:${process.env.PORT}`
    }
  },
  plugins: [react()],
})
