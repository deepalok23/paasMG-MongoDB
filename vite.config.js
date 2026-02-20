import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // From our previous fix

export default defineConfig({
  base: '/paasMG-MongoDB/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
