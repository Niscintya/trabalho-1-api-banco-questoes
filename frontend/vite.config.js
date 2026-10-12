import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/questoes': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/disciplinas': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/categorias': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/assuntos': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/notificacoes': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/health': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})