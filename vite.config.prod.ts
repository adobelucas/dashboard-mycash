import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração otimizada para produção
export default defineConfig({
  plugins: [react()],
  build: {
    // Otimizações de build
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
    // Limite de avisos
    chunkSizeWarningLimit: 1000,
  },
  // Otimizações de preview
  preview: {
    port: 4173,
    strictPort: true,
  },
})
